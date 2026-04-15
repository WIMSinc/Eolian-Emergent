import pytest
import requests
import os

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')

# Contact form tests
class TestContactAPI:
    """Contact form API tests"""

    def test_post_contact(self):
        payload = {
            "name": "TEST_John Doe",
            "email": "test@example.com",
            "phone": "555-1234",
            "organization": "TEST_Corp",
            "message": "This is a test message"
        }
        r = requests.post(f"{BASE_URL}/api/contact", json=payload)
        assert r.status_code == 200
        data = r.json()
        assert data["name"] == payload["name"]
        assert data["email"] == payload["email"]
        assert data["message"] == payload["message"]
        assert "id" in data
        assert "timestamp" in data

    def test_post_contact_missing_required(self):
        r = requests.post(f"{BASE_URL}/api/contact", json={"name": "Only Name"})
        assert r.status_code == 422

    def test_get_contacts(self):
        r = requests.get(f"{BASE_URL}/api/contact")
        assert r.status_code == 200
        data = r.json()
        assert isinstance(data, list)

    def test_post_contact_optional_fields(self):
        payload = {"name": "TEST_Minimal", "email": "min@test.com", "message": "Minimal msg"}
        r = requests.post(f"{BASE_URL}/api/contact", json=payload)
        assert r.status_code == 200
        data = r.json()
        assert data["phone"] == ""
        assert data["organization"] == ""

class TestStatusAPI:
    """Status check API tests"""

    def test_get_root(self):
        r = requests.get(f"{BASE_URL}/api/")
        assert r.status_code == 200

    def test_post_status(self):
        r = requests.post(f"{BASE_URL}/api/status", json={"client_name": "TEST_Client"})
        assert r.status_code == 200
        data = r.json()
        assert data["client_name"] == "TEST_Client"
        assert "id" in data

    def test_get_status(self):
        r = requests.get(f"{BASE_URL}/api/status")
        assert r.status_code == 200
        assert isinstance(r.json(), list)


# Blog API tests
class TestBlogAPI:
    """Blog/News endpoints tests"""

    def test_get_all_blog_posts(self):
        r = requests.get(f"{BASE_URL}/api/blog")
        assert r.status_code == 200
        data = r.json()
        assert isinstance(data, list)
        assert len(data) == 5, f"Expected 5 seeded posts, got {len(data)}"

    def test_blog_post_fields(self):
        r = requests.get(f"{BASE_URL}/api/blog")
        data = r.json()
        post = data[0]
        for field in ["id", "title", "slug", "excerpt", "content", "category", "published"]:
            assert field in post, f"Missing field: {field}"

    def test_get_single_post_artak_block_2(self):
        r = requests.get(f"{BASE_URL}/api/blog/artak-block-2-release")
        assert r.status_code == 200
        data = r.json()
        assert data["slug"] == "artak-block-2-release"

    def test_get_nonexistent_post_returns_404(self):
        r = requests.get(f"{BASE_URL}/api/blog/nonexistent-slug-xyz")
        assert r.status_code == 404

    def test_all_five_slugs_exist(self):
        slugs = [
            "artak-block-2-release",
            "eolian-metaverse-patent",
            "nato-sof-2025-artak-deployment",
            "map-maker-3d-mapping-revolution",
            "largest-roc-drill-in-artak"
        ]
        for slug in slugs:
            r = requests.get(f"{BASE_URL}/api/blog/{slug}")
            assert r.status_code == 200, f"Slug {slug} returned {r.status_code}"

