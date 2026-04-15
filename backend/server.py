from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
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


@api_router.get("/")
async def root():
    return {"message": "EolianVR API"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    return status_checks

@api_router.post("/contact", response_model=ContactSubmission)
async def create_contact_submission(input: ContactSubmissionCreate):
    submission_dict = input.model_dump()
    submission_obj = ContactSubmission(**submission_dict)
    doc = submission_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    _ = await db.contact_submissions.insert_one(doc)
    return submission_obj

@api_router.get("/contact", response_model=List[ContactSubmission])
async def get_contact_submissions():
    submissions = await db.contact_submissions.find({}, {"_id": 0}).to_list(1000)
    for sub in submissions:
        if isinstance(sub['timestamp'], str):
            sub['timestamp'] = datetime.fromisoformat(sub['timestamp'])
    return submissions

# Blog endpoints
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
        from fastapi import HTTPException
        raise HTTPException(status_code=404, detail="Post not found")
    if isinstance(post.get('published'), str):
        post['published'] = datetime.fromisoformat(post['published'])
    return post

@api_router.post("/blog", response_model=BlogPost)
async def create_blog_post(input: BlogPostCreate):
    post_obj = BlogPost(**input.model_dump())
    doc = post_obj.model_dump()
    doc['published'] = doc['published'].isoformat()
    await db.blog_posts.insert_one(doc)
    return post_obj

# Seed blog posts on startup
@app.on_event("startup")
async def seed_blog_posts():
    count = await db.blog_posts.count_documents({})
    if count == 0:
        seed_posts = [
            {
                "id": str(uuid.uuid4()), "slug": "artak-block-2-release",
                "title": "ARTAK Block 2 Now Available",
                "excerpt": "The biggest ARTAK update ever is here. Block 2 delivers massive improvements in 3D mapping, UI/UX, speed, and multi-domain operations capability.",
                "content": "We are excited to announce the release of ARTAK Block 2 — the most significant update to the Augmented Reality Team Awareness Kit since its inception. Block 2 includes dramatically improved high-quality 3D maps, a streamlined UI/UX designed to be intuitive for operators of all experience levels, and 'World in a Box' — a 3D tiled map base layer of the entire planet.\n\nJADC2 live data stream overlays from hundreds of sources are now available, along with enriched full immersion 'Room-Scale' mode in VR, enhanced maps for building interiors, underwater, and subterranean environments, and advanced capabilities at the edge.\n\nBlock 2 also brings capabilities for true Multi-Domain Operations (MDO) across Land, Air, Sea, and Space, with boosted speed, stability, fidelity, security, capacity, and decreased latency for a vastly superior user experience.",
                "category": "Product", "image": "https://images.unsplash.com/photo-1588336443962-49d88df004a1?w=800&q=80",
                "published": "2025-10-15T10:00:00+00:00"
            },
            {
                "id": str(uuid.uuid4()), "slug": "eolian-metaverse-patent",
                "title": "Eolian Receives Patent for Metaverse System and Method",
                "excerpt": "The Eolian Simulation Platform (ESP) patent covers our foundational metaverse technology that underpins systems developed for US federal agencies.",
                "content": "EolianVR, Inc. has been granted a patent for its Metaverse System and Method. The Eolian Simulation Platform (ESP) currently underpins a number of high-profile systems and platforms developed by Eolian on behalf of US federal agencies and national healthcare organizations.\n\nThis patent represents a significant milestone for the company and validates our innovative approach to immersive technology. The ESP enables persistent, shared virtual environments that can be used for training, planning, command and control, and collaboration across organizations and geographies.",
                "category": "Company", "image": "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
                "published": "2025-04-26T10:00:00+00:00"
            },
            {
                "id": str(uuid.uuid4()), "slug": "nato-sof-2025-artak-deployment",
                "title": "ARTAK Deployed at NATO SOF 2025 Exercise",
                "excerpt": "ARTAK was used to increase the efficiency and precision of planning, briefing, and rehearsal activities across US and Partner Forces during NATO SOF 2025.",
                "content": "ARTAK was deployed in preparation for and during NATO SOF 2025 to increase the efficiency and precision of planning, briefing, and rehearsal activities across both US and Partner Forces.\n\nLeading up to the exercise, ARTAK was used to develop and refine the exercise plan, and alongside PowerPoint, was also used to present to higher headquarters for approval. During the exercise, the assault force used ARTAK to visualize the target's interior, subterranean, and exterior structures.\n\nThe shared understanding and enhanced situational awareness provided by ARTAK helped enable the successful execution of the training mission, during which a high-value target — defended by approximately 40 enemy fighters within a 300-acre compound featuring over 400,000 SF of interconnected structures and tunnel networks — was located, contained, and neutralized in under four hours with minimal friendly casualties.",
                "category": "Operations", "image": "https://images.unsplash.com/photo-1759167625071-069dc252702f?w=800&q=80",
                "published": "2025-09-10T10:00:00+00:00"
            },
            {
                "id": str(uuid.uuid4()), "slug": "map-maker-3d-mapping-revolution",
                "title": "Map Maker: Redefining 3D Mapping at the Edge",
                "excerpt": "Map Maker creates high-quality 3D maps in minutes using raw images, video, or LiDAR — entirely automated, no internet required.",
                "content": "We're proud to highlight Map Maker, our revolutionary 3D mapping software that uses raw images, videos, or LiDAR to create high-quality 3D maps in minutes.\n\nWhat makes Map Maker different? It is entirely automated, works without the internet, and uses non-proprietary file formats. This means you can make maps anywhere in the world with one click and view them on any device.\n\nMap Maker maps are interoperable with ARTAK, ATAK, WinTAK, and other government systems, as well as free non-proprietary 3D viewers like Meshlab. Machine learning and next-gen surface reconstruction algorithms make this unprecedented speed and quality possible.\n\nMap Maker kits are purpose-built, pre-configured load-outs that include the software and hardware, with turn-key kits available with select collection devices such as drones or LiDAR scanners.",
                "category": "Product", "image": "https://images.unsplash.com/photo-1608235973986-4492bbe7b035?w=800&q=80",
                "published": "2025-08-20T10:00:00+00:00"
            },
            {
                "id": str(uuid.uuid4()), "slug": "largest-roc-drill-in-artak",
                "title": "90-Minute Joint ROC Drill Conducted in ARTAK",
                "excerpt": "The largest and longest brief ever conducted by a customer in ARTAK — a 90-minute rehearsal of concepts drill during a joint exercise.",
                "content": "ARTAK was used to conduct a 90-minute rehearsal of concepts (ROC) drill during a joint exercise — the largest and longest brief ever conducted by a customer in ARTAK.\n\nPrior to the ROC drill, key leaders collaborated in ARTAK, using a realistic 3D map of the area of interest to help them develop the mission plan. During the ROC drill, briefers used ARTAK to rehearse and brief the plan, while enablers and other personnel viewed the brief in AR and on TV screens.\n\nThis milestone demonstrates ARTAK's capability to support sustained, complex briefings at scale — a critical capability for operational planning at higher echelons.",
                "category": "Operations", "image": "https://images.unsplash.com/photo-1773839420967-b50018fc0505?w=800&q=80",
                "published": "2025-07-05T10:00:00+00:00"
            },
        ]
        for post in seed_posts:
            await db.blog_posts.insert_one(post)
        logger.info(f"Seeded {len(seed_posts)} blog posts")


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
