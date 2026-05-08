"""Backend tests for admin auth and CRUD endpoints"""
import pytest
import requests
import os

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')

ADMIN_EMAIL = "admin@eolianvr.com"
ADMIN_PASSWORD = "EolianAdmin2025!"


@pytest.fixture(scope="module")
def token():
    resp = requests.post(f"{BASE_URL}/api/admin/login", json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD})
    assert resp.status_code == 200
    return resp.json()["token"]


@pytest.fixture(scope="module")
def auth_headers(token):
    return {"Authorization": f"Bearer {token}"}


# Auth tests
class TestAdminLogin:
    def test_login_success(self):
        resp = requests.post(f"{BASE_URL}/api/admin/login", json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD})
        assert resp.status_code == 200
        data = resp.json()
        assert "token" in data
        assert data["user"]["email"] == ADMIN_EMAIL
        assert data["user"]["role"] == "admin"

    def test_login_wrong_password(self):
        resp = requests.post(f"{BASE_URL}/api/admin/login", json={"email": ADMIN_EMAIL, "password": "wrongpass"})
        assert resp.status_code == 401

    def test_login_wrong_email(self):
        resp = requests.post(f"{BASE_URL}/api/admin/login", json={"email": "wrong@example.com", "password": ADMIN_PASSWORD})
        assert resp.status_code == 401

    def test_me_with_valid_token(self, token):
        resp = requests.get(f"{BASE_URL}/api/admin/me", headers={"Authorization": f"Bearer {token}"})
        assert resp.status_code == 200
        data = resp.json()
        assert data["email"] == ADMIN_EMAIL
        assert data["role"] == "admin"
        assert "password_hash" not in data

    def test_me_without_token(self):
        resp = requests.get(f"{BASE_URL}/api/admin/me")
        assert resp.status_code == 401


# Blog CRUD tests
class TestAdminBlogCRUD:
    created_post_id = None

    def test_create_blog_post(self, auth_headers):
        payload = {
            "slug": "TEST-admin-post-slug",
            "title": "TEST Admin Post",
            "excerpt": "Test excerpt",
            "content": "Test content",
            "category": "News"
        }
        resp = requests.post(f"{BASE_URL}/api/admin/blog", json=payload, headers=auth_headers)
        assert resp.status_code == 200
        data = resp.json()
        assert data["title"] == payload["title"]
        assert data["slug"] == payload["slug"]
        assert "id" in data
        TestAdminBlogCRUD.created_post_id = data["id"]

    def test_create_blog_post_unauthenticated(self):
        payload = {"slug": "test", "title": "Test", "excerpt": "e", "content": "c"}
        resp = requests.post(f"{BASE_URL}/api/admin/blog", json=payload)
        assert resp.status_code == 401

    def test_update_blog_post(self, auth_headers):
        post_id = TestAdminBlogCRUD.created_post_id
        if not post_id:
            pytest.skip("No post created")
        resp = requests.put(f"{BASE_URL}/api/admin/blog/{post_id}", json={"title": "TEST Updated Title"}, headers=auth_headers)
        assert resp.status_code == 200
        assert resp.json()["title"] == "TEST Updated Title"

    def test_delete_blog_post(self, auth_headers):
        post_id = TestAdminBlogCRUD.created_post_id
        if not post_id:
            pytest.skip("No post created")
        resp = requests.delete(f"{BASE_URL}/api/admin/blog/{post_id}", headers=auth_headers)
        assert resp.status_code == 200

    def test_delete_nonexistent_post(self, auth_headers):
        resp = requests.delete(f"{BASE_URL}/api/admin/blog/nonexistent-id-xyz", headers=auth_headers)
        assert resp.status_code == 404


# Upload tests
class TestAdminUpload:
    def test_upload_valid_jpeg(self, auth_headers):
        import io
        # Minimal valid JPEG bytes (SOI + EOI markers)
        jpeg_bytes = (
            b'\xff\xd8\xff\xe0\x00\x10JFIF\x00\x01\x01\x00\x00\x01\x00\x01\x00\x00'
            b'\xff\xdb\x00C\x00\x08\x06\x06\x07\x06\x05\x08\x07\x07\x07\t\t'
            b'\x08\n\x0c\x14\r\x0c\x0b\x0b\x0c\x19\x12\x13\x0f\x14\x1d\x1a'
            b'\x1f\x1e\x1d\x1a\x1c\x1c $.\' ",#\x1c\x1c(7),01444\x1f\'9=82<.342\x1e\xb5'
            b'\xff\xd9'
        )
        files = {"file": ("test.jpg", io.BytesIO(jpeg_bytes), "image/jpeg")}
        resp = requests.post(f"{BASE_URL}/api/admin/upload", files=files, headers=auth_headers)
        assert resp.status_code == 200
        data = resp.json()
        assert "url" in data
        assert "filename" in data
        assert "size" in data
        assert data["url"].startswith("/api/uploads/")
        TestAdminUpload.uploaded_filename = data["filename"]

    uploaded_filename = None

    def test_uploaded_file_accessible(self, auth_headers):
        if not TestAdminUpload.uploaded_filename:
            pytest.skip("No file uploaded")
        resp = requests.get(f"{BASE_URL}/api/uploads/{TestAdminUpload.uploaded_filename}")
        assert resp.status_code == 200

    def test_upload_non_image_rejected(self, auth_headers):
        import io
        files = {"file": ("test.txt", io.BytesIO(b"hello world"), "text/plain")}
        resp = requests.post(f"{BASE_URL}/api/admin/upload", files=files, headers=auth_headers)
        assert resp.status_code == 400

    def test_upload_without_auth(self):
        import io
        jpeg_bytes = b'\xff\xd8\xff\xd9'
        files = {"file": ("test.jpg", io.BytesIO(jpeg_bytes), "image/jpeg")}
        resp = requests.post(f"{BASE_URL}/api/admin/upload", files=files)
        assert resp.status_code == 401


# Contacts tests
class TestAdminContacts:
    def test_get_contacts_authenticated(self, auth_headers):
        resp = requests.get(f"{BASE_URL}/api/admin/contacts", headers=auth_headers)
        assert resp.status_code == 200
        assert isinstance(resp.json(), list)

    def test_get_contacts_unauthenticated(self):
        resp = requests.get(f"{BASE_URL}/api/admin/contacts")
        assert resp.status_code == 401
