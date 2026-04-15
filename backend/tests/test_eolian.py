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
