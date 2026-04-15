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


# Contacts tests
class TestAdminContacts:
    def test_get_contacts_authenticated(self, auth_headers):
        resp = requests.get(f"{BASE_URL}/api/admin/contacts", headers=auth_headers)
        assert resp.status_code == 200
        assert isinstance(resp.json(), list)

    def test_get_contacts_unauthenticated(self):
        resp = requests.get(f"{BASE_URL}/api/admin/contacts")
        assert resp.status_code == 401
