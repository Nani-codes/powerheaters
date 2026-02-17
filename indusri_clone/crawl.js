const fs = require('fs');
const path = require('path');

const START_URL = 'https://indusri.wpengine.com/';
const DOMAIN = 'indusri.wpengine.com';
const OUTPUT_FILE = 'urls.txt';

const visited = new Set();
const queue = [START_URL];
const foundUrls = new Set();

// Regex to find links in href and src attributes
// Captures content inside quotes
const LINK_REGEX = /(?:href|src)=["']([^"']+)["']/gi;

async function fetchUrl(url) {
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

        const response = await fetch(url, {
            signal: controller.signal,
            headers: {
                'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'
            }
        });
        clearTimeout(timeoutId);

        if (!response.ok) {
            console.error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
            return null;
        }

        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('text/html')) {
            // Not HTML, just skip parsing but we found it
            return null;
        }

        return await response.text();
    } catch (error) {
        console.error(`Error fetching ${url}: ${error.message}`);
        return null;
    }
}

function normalize(link, baseUrl) {
    try {
        const urlObj = new URL(link, baseUrl);

        // Only internal links
        if (urlObj.hostname !== DOMAIN) return null;
        if (urlObj.protocol !== 'http:' && urlObj.protocol !== 'https:') return null;

        // Remove hash
        urlObj.hash = '';

        // Remove query params to avoid infinite loops/traps?
        // For a static clone, usually query params are bad (e.g. calendar?month=next)
        // But some sites rely on them. WP sites usually use pretty permalinks.
        // Let's strip them to be safe and avoid duplicates like ?v=1.2.3
        // Exception: admin-ajax.php?action=... but we probably don't want those for static clone.
        urlObj.search = '';

        return urlObj.href;
    } catch (e) {
        return null;
    }
}

async function crawl() {
    console.log(`Starting crawl from ${START_URL}`);

    // Add start URL to found
    foundUrls.add(START_URL);

    let count = 0;
    while (queue.length > 0) {
        const currentUrl = queue.shift();

        if (visited.has(currentUrl)) continue;
        visited.add(currentUrl);

        count++;
        if (count % 10 === 0) console.log(`Crawled ${count} pages. Queue size: ${queue.length}`);

        const html = await fetchUrl(currentUrl);
        if (!html) continue;

        let match;
        while ((match = LINK_REGEX.exec(html)) !== null) {
            const rawLink = match[1];
            const normalized = normalize(rawLink, currentUrl);

            if (normalized) {
                if (!foundUrls.has(normalized)) {
                    foundUrls.add(normalized);
                    // Only queue HTML pages for further crawling
                    // Simple heuristic: valid extension or no extension
                    const ext = path.extname(new URL(normalized).pathname).toLowerCase();
                    if (!ext || ['.html', '.htm', '.php', '.asp', '.aspx'].includes(ext)) {
                        queue.push(normalized);
                    }
                }
            }
        }

        // Be nice
        await new Promise(r => setTimeout(r, 50));
    }

    console.log(`Finished. Found ${foundUrls.size} unique URLs.`);

    const sortedUrls = [...foundUrls].sort();
    fs.writeFileSync(OUTPUT_FILE, sortedUrls.join('\n'));
    console.log(`Saved URLs to ${OUTPUT_FILE}`);
}

crawl().catch(console.error);
