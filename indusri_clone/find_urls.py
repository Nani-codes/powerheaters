import urllib.request
import urllib.parse
from html.parser import HTMLParser
import sys
import time

start_url = "https://indusri.wpengine.com/"
domain = "indusri.wpengine.com"
urls_file = "urls.txt"

visited = set()
queue = [start_url]
found_urls = []

class LinkParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.links = []

    def handle_starttag(self, tag, attrs):
        if tag == 'a':
            for attr, value in attrs:
                if attr == 'href':
                    self.links.append(value)

def get_links(url):
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=10) as response:
            if 'text/html' not in response.getheader('Content-Type', ''):
                return []
            html = response.read().decode('utf-8', errors='ignore')
            parser = LinkParser()
            parser.feed(html)
            return parser.links
    except Exception as e:
        print(f"Error fetching {url}: {e}", file=sys.stderr)
        return []

def normalize_url(url, base):
    full_url = urllib.parse.urljoin(base, url)
    parsed = urllib.parse.urlparse(full_url)
    # Filter out external links and non-http schemes
    if parsed.netloc != domain:
        return None
    if parsed.scheme not in ('http', 'https'):
        return None
    # Remove fragments and query parameters for static cloning
    clean_url = urllib.parse.urlunparse((parsed.scheme, parsed.netloc, parsed.path, '', '', ''))
    return clean_url

print(f"Starting crawl from {start_url}...", file=sys.stderr)

count = 0
while queue:
    current_url = queue.pop(0)
    if current_url in visited:
        continue
    
    visited.add(current_url)
    found_urls.append(current_url)
    count += 1
    if count % 10 == 0:
        print(f"Visited {count} pages...", file=sys.stderr)

    links = get_links(current_url)
    for link in links:
        normalized = normalize_url(link, current_url)
        if normalized and normalized not in visited and normalized not in queue:
            # Basic extension filter to avoid non-html (images/pdfs will be handled by wget -p later or skipped)
            # Actually, we want to find HTML pages to crawl deeper.
            # But wget -i will need assets too? No, wget -p handles assets for each page.
            # So we only need to find HTML pages here.
            path = urllib.parse.urlparse(normalized).path
            if '.' in path.split('/')[-1]:
                ext = path.split('.')[-1].lower()
                if ext not in ['html', 'php', 'htm', 'asp', 'aspx', 'jsp', '']: # extensive list
                     # If it has an extension that is NOT html-like, treat as asset and skip for CRAWLING
                    # but maybe add to list?
                    # For now, let's just crawl things that look like pages (no extension or .html/php)
                    if ext not in ['html', 'htm', 'php']:
                         continue
            
            queue.append(normalized)
    
    time.sleep(0.1) # Be nice

with open(urls_file, 'w') as f:
    for url in found_urls:
        f.write(url + '\n')

print(f"Finished. Found {len(found_urls)} URLs. Saved to {urls_file}", file=sys.stderr)
