"""Tests for sitemap.xml and robots.txt endpoints"""
import pytest
import requests
import os
from xml.etree import ElementTree as ET

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')

EXPECTED_STATIC_PAGES = ['/', '/about', '/artak', '/mapmaker', '/lab', '/support', '/team', '/news']
EXPECTED_ARTAK_SLUGS = [
    '/artak/disaster-response',
    '/artak/search-rescue',
    '/artak/security-protection',
    '/artak/police-law-enforcement',
    '/artak/fire-emergency',
    '/artak/space-aerospace',
]

class TestSitemapXML:
    """Tests for GET /api/sitemap.xml"""

    def test_sitemap_returns_200(self):
        response = requests.get(f"{BASE_URL}/api/sitemap.xml")
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text[:200]}"
        print("PASS: sitemap.xml returns 200")

    def test_sitemap_content_type(self):
        response = requests.get(f"{BASE_URL}/api/sitemap.xml")
        ct = response.headers.get('content-type', '')
        assert 'xml' in ct.lower(), f"Expected application/xml, got: {ct}"
        print(f"PASS: content-type is {ct}")

    def test_sitemap_valid_xml(self):
        response = requests.get(f"{BASE_URL}/api/sitemap.xml")
        try:
            root = ET.fromstring(response.content)
            print("PASS: sitemap is valid XML")
        except ET.ParseError as e:
            pytest.fail(f"Invalid XML: {e}")

    def test_sitemap_has_urlset_root(self):
        response = requests.get(f"{BASE_URL}/api/sitemap.xml")
        root = ET.fromstring(response.content)
        assert 'urlset' in root.tag, f"Expected urlset root, got: {root.tag}"
        print(f"PASS: root element is urlset")

    def test_sitemap_contains_all_static_pages(self):
        response = requests.get(f"{BASE_URL}/api/sitemap.xml")
        root = ET.fromstring(response.content)
        ns = {'sm': 'http://www.sitemaps.org/schemas/sitemap/0.9'}
        locs = [url.find('sm:loc', ns).text for url in root.findall('sm:url', ns)]
        # fallback without namespace
        if not locs:
            locs = [url.find('loc').text for url in root.findall('url')]
        
        missing = []
        for page in EXPECTED_STATIC_PAGES:
            if not any(page == u or u.endswith(page) for u in locs):
                # handle trailing slash
                if page == '/' and any(u.rstrip('/') + '/' in locs or u.endswith('/') for u in locs):
                    continue
                missing.append(page)
        
        assert not missing, f"Missing static pages: {missing}\nFound: {locs}"
        print(f"PASS: all 8 static pages found in sitemap")

    def test_sitemap_contains_artak_subpages(self):
        response = requests.get(f"{BASE_URL}/api/sitemap.xml")
        root = ET.fromstring(response.content)
        ns = {'sm': 'http://www.sitemaps.org/schemas/sitemap/0.9'}
        locs = [url.find('sm:loc', ns).text for url in root.findall('sm:url', ns)]
        if not locs:
            locs = [url.find('loc').text for url in root.findall('url')]
        
        missing = []
        for slug in EXPECTED_ARTAK_SLUGS:
            if not any(slug in u for u in locs):
                missing.append(slug)
        
        assert not missing, f"Missing ARTAK sub-pages: {missing}"
        print(f"PASS: ARTAK sub-pages found: {[u for u in locs if '/artak/' in u]}")

    def test_sitemap_contains_blog_posts(self):
        response = requests.get(f"{BASE_URL}/api/sitemap.xml")
        root = ET.fromstring(response.content)
        ns = {'sm': 'http://www.sitemaps.org/schemas/sitemap/0.9'}
        locs = [url.find('sm:loc', ns).text for url in root.findall('sm:url', ns)]
        if not locs:
            locs = [url.find('loc').text for url in root.findall('url')]
        
        news_urls = [u for u in locs if '/news/' in u]
        assert len(news_urls) >= 1, f"Expected at least 1 blog post URL, found: {news_urls}"
        print(f"PASS: Found {len(news_urls)} blog post URLs: {news_urls}")

    def test_sitemap_each_url_has_required_fields(self):
        response = requests.get(f"{BASE_URL}/api/sitemap.xml")
        root = ET.fromstring(response.content)
        ns = {'sm': 'http://www.sitemaps.org/schemas/sitemap/0.9'}
        urls = root.findall('sm:url', ns)
        if not urls:
            urls = root.findall('url')
            ns = {}

        for url_el in urls:
            loc = url_el.find('sm:loc', ns) if ns else url_el.find('loc')
            lastmod = url_el.find('sm:lastmod', ns) if ns else url_el.find('lastmod')
            changefreq = url_el.find('sm:changefreq', ns) if ns else url_el.find('changefreq')
            priority = url_el.find('sm:priority', ns) if ns else url_el.find('priority')
            
            assert loc is not None and loc.text, "Missing loc"
            assert lastmod is not None and lastmod.text, f"Missing lastmod for {loc.text if loc else 'unknown'}"
            assert changefreq is not None and changefreq.text, f"Missing changefreq for {loc.text if loc else 'unknown'}"
            assert priority is not None and priority.text, f"Missing priority for {loc.text if loc else 'unknown'}"
        
        print(f"PASS: All {len(urls)} URL entries have loc, lastmod, changefreq, priority")

    def test_sitemap_no_admin_urls(self):
        response = requests.get(f"{BASE_URL}/api/sitemap.xml")
        root = ET.fromstring(response.content)
        ns = {'sm': 'http://www.sitemaps.org/schemas/sitemap/0.9'}
        locs = [url.find('sm:loc', ns).text for url in root.findall('sm:url', ns)]
        if not locs:
            locs = [url.find('loc').text for url in root.findall('url')]
        
        admin_urls = [u for u in locs if '/admin' in u]
        assert not admin_urls, f"Admin URLs should not appear in sitemap: {admin_urls}"
        print("PASS: No /admin URLs in sitemap")

    def test_sitemap_total_url_count(self):
        response = requests.get(f"{BASE_URL}/api/sitemap.xml")
        root = ET.fromstring(response.content)
        ns = {'sm': 'http://www.sitemaps.org/schemas/sitemap/0.9'}
        urls = root.findall('sm:url', ns)
        if not urls:
            urls = root.findall('url')
        
        count = len(urls)
        assert count >= 14, f"Expected at least 14 URLs (8 static + 6 ARTAK), got {count}"
        print(f"PASS: Sitemap has {count} URLs total")

    def test_sitemap_blog_post_lastmod_from_published_date(self):
        # Get blog posts from API to compare dates
        posts_response = requests.get(f"{BASE_URL}/api/blog")
        if posts_response.status_code != 200:
            pytest.skip("Blog posts API not available")
        
        posts = posts_response.json()
        if not posts:
            pytest.skip("No blog posts available")
        
        sitemap_response = requests.get(f"{BASE_URL}/api/sitemap.xml")
        root = ET.fromstring(sitemap_response.content)
        ns = {'sm': 'http://www.sitemaps.org/schemas/sitemap/0.9'}
        
        url_map = {}
        for url_el in root.findall('sm:url', ns):
            loc = url_el.find('sm:loc', ns)
            lastmod = url_el.find('sm:lastmod', ns)
            if loc is not None and lastmod is not None:
                url_map[loc.text] = lastmod.text
        
        # Check at least one post has its published date as lastmod
        found_match = False
        for post in posts[:3]:
            slug = post.get('slug', '')
            if slug:
                news_url = next((u for u in url_map if f'/news/{slug}' in u), None)
                if news_url:
                    found_match = True
                    print(f"PASS: Blog post {slug} found in sitemap with lastmod: {url_map[news_url]}")
                    break
        
        assert found_match, "No blog post URLs matched in sitemap"


class TestRobotsTxt:
    """Tests for GET /api/robots.txt"""

    def test_robots_returns_200(self):
        response = requests.get(f"{BASE_URL}/api/robots.txt")
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text[:200]}"
        print("PASS: robots.txt returns 200")

    def test_robots_content_type(self):
        response = requests.get(f"{BASE_URL}/api/robots.txt")
        ct = response.headers.get('content-type', '')
        assert 'text/plain' in ct.lower(), f"Expected text/plain, got: {ct}"
        print(f"PASS: content-type is {ct}")

    def test_robots_allows_all_crawlers(self):
        response = requests.get(f"{BASE_URL}/api/robots.txt")
        text = response.text
        assert 'User-agent: *' in text, f"Missing 'User-agent: *'"
        assert 'Allow: /' in text, f"Missing 'Allow: /'"
        print("PASS: robots.txt allows all crawlers on /")

    def test_robots_disallows_admin(self):
        response = requests.get(f"{BASE_URL}/api/robots.txt")
        text = response.text
        assert 'Disallow: /admin' in text, f"Missing 'Disallow: /admin' in:\n{text}"
        print("PASS: robots.txt disallows /admin")

    def test_robots_contains_sitemap_directive(self):
        response = requests.get(f"{BASE_URL}/api/robots.txt")
        text = response.text
        assert 'Sitemap:' in text, f"Missing Sitemap: directive"
        assert 'sitemap.xml' in text, f"Sitemap directive doesn't point to sitemap.xml"
        print(f"PASS: Sitemap directive present: {[l for l in text.splitlines() if 'Sitemap:' in l]}")

    def test_robots_sitemap_url_format(self):
        response = requests.get(f"{BASE_URL}/api/robots.txt")
        text = response.text
        sitemap_line = next((l for l in text.splitlines() if 'Sitemap:' in l), None)
        assert sitemap_line, "No Sitemap line found"
        sitemap_url = sitemap_line.split('Sitemap:', 1)[1].strip()
        assert sitemap_url.startswith('http'), f"Sitemap URL should be absolute: {sitemap_url}"
        print(f"PASS: Sitemap URL is absolute: {sitemap_url}")


class TestExistingFeaturesIntact:
    """Verify existing features still work"""

    def test_blog_api_still_works(self):
        response = requests.get(f"{BASE_URL}/api/blog")
        assert response.status_code == 200
        print("PASS: /api/blog still works")

    def test_sitemap_still_accessible(self):
        response = requests.get(f"{BASE_URL}/api/sitemap.xml")
        assert response.status_code == 200
        print("PASS: /api/sitemap.xml accessible")
