// const Url = require('../model/url');
const {
    fetchPageContent,
    extractLinks,
    normalizeUrl
} = require('./utils');
const {storeUrlData} = require('../storeURL');

const saveUrlData = async (req, res) => {
    try {
        const url = req.body.url || req.query.url;
        if (!url) {
            return res.status(400).json({ error: 'URL is required' });
        }
        // if url in db - return markup result from db
        const allVisitedUrls = await crawlUrls(url);
        res.status(200).json({ url, links: allVisitedUrls });
    } catch (error) {
        res.status(500).send(error)
    }
};

const crawlUrls = async (startUrl) => {
    const queue = [startUrl];
    const visited = new Set();
    const depth = 10;
    let round = 0;

    while (queue.length > 0) {
        const currentUrl = queue.shift();
        const normalizedUrl = normalizeUrl(currentUrl);
        if (!normalizedUrl || visited.has(normalizedUrl)) {
            continue;
        }

        visited.add(normalizedUrl);
        console.log(`Crawling: ${currentUrl}`);

        const htmlContent = await fetchPageContent(currentUrl);
        if (!htmlContent) {
            continue;
        }
        storeUrlData(normalizedUrl, htmlContent)

        const links = extractLinks(htmlContent);
        for (const link of links) {
            const normalizedLink = normalizeUrl(link);
            if (normalizedLink && round <= depth && !visited.has(normalizedLink)) {
                round ++;
                queue.push(link);
            }
        }
    }

    return Array.from(visited);
};
module.exports = {
    saveUrlData
};
