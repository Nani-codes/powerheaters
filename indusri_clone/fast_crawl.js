const fs = require('fs');
const path = require('path');

const START_URL = 'https://indusri.wpengine.com/';
const DOMAIN = 'indusri.wpengine.com';
const OUTPUT_FILE = 'urls.txt';
const CONCURRENCY = 5;

const visited = new Set();
const queue = [START_URL];
const foundUrls = new Set();
let activeRequests = 0;
let fileStream = fs.createWriteStream(OUTPUT_FILE, { flags: 'w' });

// Regex to find links
const LINK_REGEX = /(?:href|src)=["']([^"']+)["']/gi;

async function fetchUrl(url) {
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000);

        const response = await fetch(url, {
            signal: controller.signal,
            headers: {
                'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'
            }
        });
        clearTimeout(timeoutId);

        if (!response.ok) return null;

        const contentType = response.headers.get('content-type');
        // We only care about parsing HTML for more links
        if (!contentType || !contentType.includes('text/html')) return null;

        return await response.text();
    } catch (error) {
        return null;
    }
}

function normalize(link, baseUrl) {
    try {
        const urlObj = new URL(link, baseUrl);
        if (urlObj.hostname !== DOMAIN) return null;
        if (urlObj.protocol !== 'http:' && urlObj.protocol !== 'https:') return null;
        urlObj.hash = '';
        urlObj.search = ''; // Strip query params
        return urlObj.href;
    } catch (e) {
        return null;
    }
}

async function processUrl() {
    if (queue.length === 0 && activeRequests === 0) {
        console.log(`Finished. Found ${foundUrls.size} unique URLs.`);
        fileStream.end();
        process.exit(0);
    }

    if (queue.length === 0 || activeRequests >= CONCURRENCY) return;

    const url = queue.shift();
    if (visited.has(url)) {
        processUrl();
        return;
    }

    visited.add(url);
    activeRequests++;

    if (visited.size % 10 === 0) {
        console.log(`Crawled ${visited.size} pages. Queue: ${queue.length}. Found: ${foundUrls.size}`);
    }

    fetchUrl(url).then(html => {
        if (html) {
            let match;
            while ((match = LINK_REGEX.exec(html)) !== null) {
                const normalized = normalize(match[1], url);
                if (normalized && !foundUrls.has(normalized)) {
                    foundUrls.add(normalized);
                    fileStream.write(normalized + '\n'); // Write immediately

                    // Only queue HTML-like
                    const ext = path.extname(new URL(normalized).pathname).toLowerCase();
                    if (!ext || ['.html', '.htm', '.php'].includes(ext)) {
                        queue.push(normalized);
                    }
                }
            }
        }
    }).finally(() => {
        activeRequests--;
        processUrl(); // Trigger next
        // Also trigger siblings if we freed up a slot and have queue
        while (activeRequests < CONCURRENCY && queue.length > 0) processUrl();
    });
}

// Initial trigger
console.log(`Starting fast crawl from ${START_URL}`);
foundUrls.add(START_URL);
fileStream.write(START_URL + '\n');
processUrl();
