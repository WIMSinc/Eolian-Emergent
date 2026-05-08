"""Tests for catalog-request and contact endpoints"""
import pytest
import requests
import os

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')

class TestCatalogRequest:
    """POST /api/catalog-request tests"""

    def test_catalog_request_success(self):
        response = requests.post(f"{BASE_URL}/api/catalog-request", json={
            "name": "TEST_John Doe",
            "email": "test_catalog@example.com",
            "phone": "555-1234",
            "organization": "TEST_Org"
        })
        assert response.status_code == 200
        data = response.json()
        assert "download_url" in data
        assert data["download_url"] == "/artak-product-catalog-2026.pdf"

    def test_catalog_request_missing_name(self):
        response = requests.post(f"{BASE_URL}/api/catalog-request", json={
            "email": "test_catalog@example.com"
        })
        assert response.status_code == 422

    def test_catalog_request_missing_email(self):
        response = requests.post(f"{BASE_URL}/api/catalog-request", json={
            "name": "TEST_Jane"
        })
        assert response.status_code == 422

    def test_catalog_request_minimal_fields(self):
        """Only name+email required"""
        response = requests.post(f"{BASE_URL}/api/catalog-request", json={
            "name": "TEST_Min User",
            "email": "test_min@example.com"
        })
        assert response.status_code == 200
        data = response.json()
        assert "download_url" in data


class TestContactEndpoint:
    """POST /api/contact tests"""

    def test_contact_submission_success(self):
        response = requests.post(f"{BASE_URL}/api/contact", json={
            "name": "TEST_Contact User",
            "email": "test_contact@example.com",
            "message": "TEST_message from automated test"
        })
        assert response.status_code == 200
        data = response.json()
        assert data["email"] == "test_contact@example.com"
        assert "id" in data

    def test_contact_missing_required_fields(self):
        response = requests.post(f"{BASE_URL}/api/contact", json={
            "name": "TEST_User"
        })
        assert response.status_code == 422


class TestCatalogPDF:
    """PDF accessibility test"""

    def test_catalog_pdf_accessible(self):
        response = requests.get(f"{BASE_URL}/artak-product-catalog-2026.pdf")
        assert response.status_code == 200
        assert "pdf" in response.headers.get("content-type", "").lower() or len(response.content) > 1000
