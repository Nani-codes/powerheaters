#!/usr/bin/env python3
"""
Mock API server for the cloned Yudo website.
Serves static files AND handles POST API requests using the scraped JSON data.
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
}

# Category-specific mappings
CATEGORY_MAP = {
    "CSCG000001": "categoryMobility.json",
    "CSCG000002": "categoryHome.json",
    "CSCG000003": "categoryWork.json",
    "CSCG000004": "categoryIndustrial.json",
    "CSCG000005": "categoryEverywhere.json",
}


class YudoHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=BASE_DIR, **kwargs)

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

        # Unknown POST endpoint — return 404
        self.send_response(404)
        self.send_header("Content-Type", "application/json")
        self.end_headers()
        self.wfile.write(json.dumps({"error": "Not found", "path": path}).encode())

    def do_OPTIONS(self):
        """Handle CORS preflight."""
        self.send_response(200)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()

    def end_headers(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        super().end_headers()

    def guess_type(self, path):
        """Extended MIME type support."""
        if path.endswith('.woff'):
            return 'font/woff'
        if path.endswith('.woff2'):
            return 'font/woff2'
        return super().guess_type(path)


if __name__ == "__main__":
    print(f"🚀 Yudo Clone Server starting on http://localhost:{PORT}")
    print(f"📁 Serving static files from: {BASE_DIR}")
    print(f"🔌 API data from: {API_DATA_DIR}")
    print(f"📋 {len(API_ROUTES)} API endpoints mapped")
    print(f"\n👉 Open http://localhost:{PORT}/en/index.html in your browser\n")

    with http.server.HTTPServer(("", PORT), YudoHandler) as httpd:
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nServer stopped.")
