#!/usr/bin/env python3
"""
Mock API server for the cloned Yudo website.
Serves static files, handles POST API requests, and routes SPA-style URLs.
"""

import http.server
import json
import os
import urllib.parse

PORT = 8080
BASE_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "yudo.com")
API_DATA_DIR = os.path.join(BASE_DIR, "api_data")

# Map API endpoints to their corresponding JSON files
API_ROUTES = {
    "/en/common/getMenuList": "menuList.json",
    "/en/common/getCommonCode": "inquiryTypes.json",
    "/locale/getLangList": "langList.json",
    "/locale/setLocale": "langList.json",
    "/en/site/footer/getDetail": "footer.json",
    "/en/site/index/getPageInit": "homePageInit.json",
    "/en/site/corporationintroduce/getPageInit": "companyIntro.json",
    "/en/site/category/getPageInit": "categoryMobility.json",
    "/en/company/boarddirection/getList": "boardOfDirectors.json",
    "/en/company/executives/getList": "executives.json",
    "/en/company/history/getList": "history.json",
    "/en/company/news/getPagingList": "newsList.json",
    "/en/company/news/getDetail": "newsList.json",
    "/en/prod/successcase/getList": "successCases.json",
    "/en/prod/technology/getPagingList": "technologies.json",
    "/en/prod/applicationrealm/getPagingList": "applicationRealm.json",
    "/en/support/contact-info/global-network/getPageInit": "globalNetworkInit.json",
    "/en/support/contact-info/global-network/getListAllInfo": "globalNetworkAll.json",
    "/en/support/contact-info/global-network/getCountryListByCntnnCd": "countryList.json",
    "/en/index/getPageInit": "homePageInit.json",
    "/en/inquiry/addInquiry": None,
    "/en/inquiry/getList": None,
    "/en/site/popup/getList": None,
}

# Category-specific mappings
CATEGORY_MAP = {
    "CSCG000001": "categoryMobility.json",
    "CSCG000002": "categoryHome.json",
    "CSCG000003": "categoryWork.json",
    "CSCG000004": "categoryIndustrial.json",
    "CSCG000005": "categoryEverywhere.json",
}

# Known page paths that should serve index.html
PAGE_PATHS = [
    "/en/company/board-of-direction",
    "/en/company/chairman-greeting",
    "/en/company/company-introduction",
    "/en/company/executives",
    "/en/company/history",
    "/en/company/news",
    "/en/product/at-Industrial",
    "/en/product/at-Industrial/industrial",
    "/en/product/at-home",
    "/en/product/at-home/home-appliance",
    "/en/product/at-home/personal-care",
    "/en/product/at-home/television",
    "/en/product/at-work",
    "/en/product/at-work/laptop",
    "/en/product/at-work/office-appliance",
    "/en/product/everywhere",
    "/en/product/everywhere/closures",
    "/en/product/everywhere/medical",
    "/en/product/everywhere/moblie-phone",
    "/en/product/everywhere/packaging",
    "/en/product/mobility",
    "/en/product/mobility/automotive",
    "/en/support/contact-info/global-network",
    "/en/support/download",
    "/en/sustainability/eco-friendly-technology",
    "/en/sustainability/green-energy",
    "/en/sustainability/recycled-plastic",
    "/en/sustainability/sustainable-plastics",
]


class YudoHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=BASE_DIR, **kwargs)

    def do_GET(self):
        """Handle GET requests with SPA-style routing."""
        path = urllib.parse.urlparse(self.path).path
        
        # Remove trailing slash for matching
        clean_path = path.rstrip("/")
        
        # Check if this is a known page path -> serve its index.html
        if clean_path in PAGE_PATHS:
            # Serve the page's index.html
            html_path = os.path.join(BASE_DIR, clean_path.lstrip("/"), "index.html")
            if os.path.exists(html_path):
                self.send_response(200)
                self.send_header("Content-Type", "text/html; charset=utf-8")
                self.send_header("Access-Control-Allow-Origin", "*")
                self.end_headers()
                with open(html_path, "rb") as f:
                    self.wfile.write(f.read())
                return
        
        # For /en/ or /en, serve en/index.html
        if clean_path in ("/en", ""):
            html_path = os.path.join(BASE_DIR, "en", "index.html")
            if os.path.exists(html_path):
                self.send_response(200)
                self.send_header("Content-Type", "text/html; charset=utf-8")
                self.send_header("Access-Control-Allow-Origin", "*")
                self.end_headers()
                with open(html_path, "rb") as f:
                    self.wfile.write(f.read())
                return

        # For root /, redirect to /en/
        if path == "/":
            self.send_response(302)
            self.send_header("Location", "/en/")
            self.end_headers()
            return

        # Fallback to default static file serving
        super().do_GET()

    def do_POST(self):
        """Handle POST API requests by serving scraped JSON data."""
        path = urllib.parse.urlparse(self.path).path

        # Read POST body for category-specific requests
        content_length = int(self.headers.get('Content-Length', 0))
        post_data = self.rfile.read(content_length).decode('utf-8') if content_length > 0 else ""

        # Check for category-specific request
        if path == "/en/site/category/getPageInit" and "stdCatGrpCd=" in post_data:
            params = urllib.parse.parse_qs(post_data)
            cat_code = params.get("stdCatGrpCd", [""])[0]
            json_file = CATEGORY_MAP.get(cat_code, "categoryMobility.json")
        else:
            json_file = API_ROUTES.get(path)

        if json_file is None:
            # Endpoint exists but no data — return empty success
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.send_header("Access-Control-Allow-Origin", "*")
            self.end_headers()
            self.wfile.write(json.dumps({"code": "000", "message": "success"}).encode())
            return

        if json_file:
            json_path = os.path.join(API_DATA_DIR, json_file)
            if os.path.exists(json_path):
                self.send_response(200)
                self.send_header("Content-Type", "application/json")
                self.send_header("Access-Control-Allow-Origin", "*")
                self.end_headers()
                with open(json_path, "rb") as f:
                    self.wfile.write(f.read())
                return

        # Unknown POST endpoint — return 200 with empty result to avoid JS errors
        self.send_response(200)
        self.send_header("Content-Type", "application/json")
        self.send_header("Access-Control-Allow-Origin", "*")
        self.end_headers()
        self.wfile.write(json.dumps({"code": "000", "message": "success"}).encode())

    def do_OPTIONS(self):
        """Handle CORS preflight."""
        self.send_response(200)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()

    def end_headers(self):
        # Don't double-add CORS header
        super().end_headers()

    def guess_type(self, path):
        """Extended MIME type support."""
        if path.endswith('.woff'):
            return 'font/woff'
        if path.endswith('.woff2'):
            return 'font/woff2'
        return super().guess_type(path)

    def log_message(self, format, *args):
        """Cleaner logging."""
        print(f"[{self.log_date_time_string()}] {format % args}")


if __name__ == "__main__":
    print(f"🚀 Yudo Clone Server starting on http://localhost:{PORT}")
    print(f"📁 Serving static files from: {BASE_DIR}")
    print(f"🔌 API data from: {API_DATA_DIR}")
    print(f"📋 {len(API_ROUTES)} API endpoints + {len(PAGE_PATHS)} page routes mapped")
    print(f"\n👉 Open http://localhost:{PORT}/en/ in your browser\n")

    with http.server.HTTPServer(("", PORT), YudoHandler) as httpd:
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nServer stopped.")
