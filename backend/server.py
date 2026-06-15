from fastapi import FastAPI, APIRouter, HTTPException, Depends, Request
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import smtplib
import asyncio
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid
import bcrypt
import jwt
from datetime import datetime, timezone, timedelta


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# JWT config
JWT_SECRET = os.environ['JWT_SECRET']
JWT_ALGORITHM = "HS256"

app = FastAPI()
api_router = APIRouter(prefix="/api")


# ─── Auth helpers ────────────────────────────────────────

def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")

def verify_password(plain: str, hashed: str) -> bool:
    return bcrypt.checkpw(plain.encode("utf-8"), hashed.encode("utf-8"))

def create_access_token(user_id: str, email: str) -> str:
    payload = {
        "sub": user_id, "email": email,
        "exp": datetime.now(timezone.utc) + timedelta(hours=24),
        "type": "access"
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)

async def get_current_admin(request: Request):
    auth_header = request.headers.get("Authorization", "")
    if not auth_header.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Not authenticated")
    token = auth_header[7:]
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        if payload.get("type") != "access":
            raise HTTPException(status_code=401, detail="Invalid token")
        user = await db.users.find_one({"id": payload["sub"]}, {"_id": 0})
        if not user or user.get("role") != "admin":
            raise HTTPException(status_code=403, detail="Admin access required")
        user.pop("password_hash", None)
        return user
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")


# ─── Models ──────────────────────────────────────────────

class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

class ContactSubmission(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    phone: str = ""
    organization: str = ""
    message: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class ContactSubmissionCreate(BaseModel):
    name: str
    email: str
    phone: str = ""
    organization: str = ""
    message: str

class BlogPost(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    slug: str
    title: str
    excerpt: str
    content: str
    category: str = "News"
    image: str = ""
    published: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class BlogPostCreate(BaseModel):
    slug: str
    title: str
    excerpt: str
    content: str
    category: str = "News"
    image: str = ""

class BlogPostUpdate(BaseModel):
    title: Optional[str] = None
    slug: Optional[str] = None
    excerpt: Optional[str] = None
    content: Optional[str] = None
    category: Optional[str] = None
    image: Optional[str] = None

class LoginRequest(BaseModel):
    email: str
    password: str

class CatalogRequest(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    phone: str = ""
    organization: str = ""
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class CatalogRequestCreate(BaseModel):
    name: str
    email: str
    phone: str = ""
    organization: str = ""


# ─── Email helper ─────────────────────────────────────────

def _send_email_sync(subject: str, body: str):
    smtp_host = os.environ.get("SMTP_HOST", "")
    smtp_port = int(os.environ.get("SMTP_PORT", "587"))
    smtp_user = os.environ.get("SMTP_USER", "")
    smtp_pass = os.environ.get("SMTP_PASS", "")
    notify_email = os.environ.get("NOTIFY_EMAIL", "mike@eolianvr.com")

    if not smtp_host or not smtp_user or not smtp_pass:
        logger.warning("SMTP not configured — skipping email notification")
        return

    msg = MIMEMultipart("alternative")
    msg["Subject"] = subject
    msg["From"] = smtp_user
    msg["To"] = notify_email
    msg.attach(MIMEText(body, "plain"))

    with smtplib.SMTP(smtp_host, smtp_port) as server:
        server.starttls()
        server.login(smtp_user, smtp_pass)
        server.sendmail(smtp_user, notify_email, msg.as_string())

async def send_notification_email(subject: str, body: str):
    try:
        await asyncio.to_thread(_send_email_sync, subject, body)
    except Exception as exc:
        logger.error("Email notification failed: %s", exc)


# ─── Public endpoints ────────────────────────────────────

@api_router.get("/")
async def root():
    return {"message": "EolianVR API"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_obj = StatusCheck(**input.model_dump())
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for c in checks:
        if isinstance(c.get('timestamp'), str):
            c['timestamp'] = datetime.fromisoformat(c['timestamp'])
    return checks

@api_router.post("/contact", response_model=ContactSubmission)
async def create_contact_submission(input: ContactSubmissionCreate):
    obj = ContactSubmission(**input.model_dump())
    doc = obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    await db.contact_submissions.insert_one(doc)
    body = (
        f"New contact form submission from {obj.name}\n\n"
        f"Name: {obj.name}\n"
        f"Email: {obj.email}\n"
        f"Phone: {obj.phone or 'N/A'}\n"
        f"Organization: {obj.organization or 'N/A'}\n\n"
        f"Message:\n{obj.message}\n\n"
        f"Submitted: {obj.timestamp.strftime('%Y-%m-%d %H:%M UTC')}"
    )
    asyncio.create_task(send_notification_email("[EolianVR] New Contact Form Submission", body))
    return obj

@api_router.post("/catalog-request", response_model=CatalogRequest)
async def create_catalog_request(input: CatalogRequestCreate):
    obj = CatalogRequest(**input.model_dump())
    doc = obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    await db.catalog_requests.insert_one(doc)
    body = (
        f"New catalog download request from {obj.name}\n\n"
        f"Name: {obj.name}\n"
        f"Email: {obj.email}\n"
        f"Phone: {obj.phone or 'N/A'}\n"
        f"Organization: {obj.organization or 'N/A'}\n\n"
        f"Submitted: {obj.timestamp.strftime('%Y-%m-%d %H:%M UTC')}"
    )
    asyncio.create_task(send_notification_email("[EolianVR] New Catalog Download Request", body))
    return obj

@api_router.get("/contact", response_model=List[ContactSubmission])
async def get_contact_submissions():
    subs = await db.contact_submissions.find({}, {"_id": 0}).to_list(1000)
    for s in subs:
        if isinstance(s.get('timestamp'), str):
            s['timestamp'] = datetime.fromisoformat(s['timestamp'])
    return subs


# ─── Blog public endpoints ───────────────────────────────

@api_router.get("/blog", response_model=List[BlogPost])
async def get_blog_posts():
    posts = await db.blog_posts.find({}, {"_id": 0}).sort("published", -1).to_list(100)
    for p in posts:
        if isinstance(p.get('published'), str):
            p['published'] = datetime.fromisoformat(p['published'])
    return posts

@api_router.get("/blog/{slug}", response_model=BlogPost)
async def get_blog_post(slug: str):
    post = await db.blog_posts.find_one({"slug": slug}, {"_id": 0})
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    if isinstance(post.get('published'), str):
        post['published'] = datetime.fromisoformat(post['published'])
    return post


# ─── Admin auth endpoints ────────────────────────────────

@api_router.post("/admin/login")
async def admin_login(req: LoginRequest):
    email = req.email.lower().strip()
    user = await db.users.find_one({"email": email}, {"_id": 0})
    if not user or not verify_password(req.password, user.get("password_hash", "")):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    if user.get("role") != "admin":
        raise HTTPException(status_code=403, detail="Admin access required")
    token = create_access_token(user["id"], user["email"])
    return {"token": token, "user": {"id": user["id"], "email": user["email"], "name": user.get("name", "Admin"), "role": user["role"]}}

@api_router.get("/admin/me")
async def admin_me(admin=Depends(get_current_admin)):
    return admin


# ─── Admin protected endpoints ───────────────────────────

@api_router.post("/admin/blog", response_model=BlogPost)
async def admin_create_post(input: BlogPostCreate, admin=Depends(get_current_admin)):
    post_obj = BlogPost(**input.model_dump())
    doc = post_obj.model_dump()
    doc['published'] = doc['published'].isoformat()
    await db.blog_posts.insert_one(doc)
    return post_obj

@api_router.put("/admin/blog/{post_id}", response_model=BlogPost)
async def admin_update_post(post_id: str, input: BlogPostUpdate, admin=Depends(get_current_admin)):
    update_data = {k: v for k, v in input.model_dump().items() if v is not None}
    if not update_data:
        raise HTTPException(status_code=400, detail="No fields to update")
    result = await db.blog_posts.update_one({"id": post_id}, {"$set": update_data})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Post not found")
    post = await db.blog_posts.find_one({"id": post_id}, {"_id": 0})
    if isinstance(post.get('published'), str):
        post['published'] = datetime.fromisoformat(post['published'])
    return post

@api_router.delete("/admin/blog/{post_id}")
async def admin_delete_post(post_id: str, admin=Depends(get_current_admin)):
    result = await db.blog_posts.delete_one({"id": post_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Post not found")
    return {"detail": "Post deleted"}

@api_router.get("/admin/contacts", response_model=List[ContactSubmission])
async def admin_get_contacts(admin=Depends(get_current_admin)):
    subs = await db.contact_submissions.find({}, {"_id": 0}).sort("timestamp", -1).to_list(1000)
    for s in subs:
        if isinstance(s.get('timestamp'), str):
            s['timestamp'] = datetime.fromisoformat(s['timestamp'])
    return subs


# ─── Startup ─────────────────────────────────────────────

@app.on_event("startup")
async def startup():
    # Seed admin
    admin_email = os.environ.get("ADMIN_EMAIL", "admin@eolianvr.com").lower().strip()
    admin_password = os.environ.get("ADMIN_PASSWORD", "EolianAdmin2025!")
    existing = await db.users.find_one({"email": admin_email}, {"_id": 0})
    if not existing:
        admin_doc = {
            "id": str(uuid.uuid4()),
            "email": admin_email,
            "password_hash": hash_password(admin_password),
            "name": "Admin",
            "role": "admin",
            "created_at": datetime.now(timezone.utc).isoformat()
        }
        await db.users.insert_one(admin_doc)
        logger.info(f"Seeded admin user: {admin_email}")
    elif not verify_password(admin_password, existing.get("password_hash", "")):
        await db.users.update_one({"email": admin_email}, {"$set": {"password_hash": hash_password(admin_password)}})
        logger.info("Updated admin password")
    await db.users.create_index("email", unique=True)

    # Seed blog posts
    count = await db.blog_posts.count_documents({})
    if count == 0:
        seed_posts = [
            {"id": str(uuid.uuid4()), "slug": "artak-block-2-release", "title": "ARTAK Block 2 Now Available", "excerpt": "The biggest ARTAK update ever is here. Block 2 delivers massive improvements in 3D mapping, UI/UX, speed, and multi-domain operations capability.", "content": "We are excited to announce the release of ARTAK Block 2 — the most significant update to the Augmented Reality Team Awareness Kit since its inception.\n\nBlock 2 includes dramatically improved high-quality 3D maps, a streamlined UI/UX designed to be intuitive for operators of all experience levels, and 'World in a Box' — a 3D tiled map base layer of the entire planet.\n\nJADC2 live data stream overlays from hundreds of sources are now available, along with enriched full immersion 'Room-Scale' mode in VR, enhanced maps for building interiors, underwater, and subterranean environments, and advanced capabilities at the edge.", "category": "Product", "image": "https://images.unsplash.com/photo-1588336443962-49d88df004a1?w=800&q=80", "published": "2025-10-15T10:00:00+00:00"},
            {"id": str(uuid.uuid4()), "slug": "eolian-metaverse-patent", "title": "Eolian Receives Patent for Metaverse System and Method", "excerpt": "The Eolian Simulation Platform (ESP) patent covers our foundational metaverse technology that underpins systems developed for US federal agencies.", "content": "EolianVR, Inc. has been granted a patent for its Metaverse System and Method.\n\nThe Eolian Simulation Platform (ESP) currently underpins a number of high-profile systems and platforms developed by Eolian on behalf of US federal agencies and national healthcare organizations.\n\nThis patent represents a significant milestone for the company and validates our innovative approach to immersive technology.", "category": "Company", "image": "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80", "published": "2025-04-26T10:00:00+00:00"},
            {"id": str(uuid.uuid4()), "slug": "nato-sof-2025-artak-deployment", "title": "ARTAK Deployed at NATO SOF 2025 Exercise", "excerpt": "ARTAK was used to increase the efficiency and precision of planning, briefing, and rehearsal activities across US and Partner Forces during NATO SOF 2025.", "content": "ARTAK was deployed in preparation for and during NATO SOF 2025 to increase the efficiency and precision of planning, briefing, and rehearsal activities across both US and Partner Forces.\n\nThe shared understanding and enhanced situational awareness provided by ARTAK helped enable the successful execution of the training mission.", "category": "Operations", "image": "https://images.unsplash.com/photo-1759167625071-069dc252702f?w=800&q=80", "published": "2025-09-10T10:00:00+00:00"},
            {"id": str(uuid.uuid4()), "slug": "map-maker-3d-mapping-revolution", "title": "Map Maker: Redefining 3D Mapping at the Edge", "excerpt": "Map Maker creates high-quality 3D maps in minutes using raw images, video, or LiDAR — entirely automated, no internet required.", "content": "We're proud to highlight Map Maker, our revolutionary 3D mapping software that uses raw images, videos, or LiDAR to create high-quality 3D maps in minutes.\n\nWhat makes Map Maker different? It is entirely automated, works without the internet, and uses non-proprietary file formats.", "category": "Product", "image": "https://images.unsplash.com/photo-1608235973986-4492bbe7b035?w=800&q=80", "published": "2025-08-20T10:00:00+00:00"},
            {"id": str(uuid.uuid4()), "slug": "largest-roc-drill-in-artak", "title": "90-Minute Joint ROC Drill Conducted in ARTAK", "excerpt": "The largest and longest brief ever conducted by a customer in ARTAK — a 90-minute rehearsal of concepts drill during a joint exercise.", "content": "ARTAK was used to conduct a 90-minute rehearsal of concepts (ROC) drill during a joint exercise — the largest and longest brief ever conducted by a customer in ARTAK.\n\nThis milestone demonstrates ARTAK's capability to support sustained, complex briefings at scale.", "category": "Operations", "image": "https://images.unsplash.com/photo-1773839420967-b50018fc0505?w=800&q=80", "published": "2025-07-05T10:00:00+00:00"},
        ]
        for post in seed_posts:
            await db.blog_posts.insert_one(post)
        logger.info(f"Seeded {len(seed_posts)} blog posts")


# ─── App config ──────────────────────────────────────────

app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
