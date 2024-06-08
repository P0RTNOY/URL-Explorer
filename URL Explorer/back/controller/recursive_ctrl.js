// this version of controller is recursive one going for defined depth on each fetched url
// im not using this contoller as the main one for simple reason
// it may run for infinity =(

const { fetchPageContent, extractLinks, normalizeUrl } = require('./utils');
const { storeUrlData } = require('../storeURL');

const saveUrlData = async (req, res) => {
    try {
        const url = req.body.url || req.query.url;
        if (!url) {
            return res.status(400).json({ error: 'URL is required' });
        }
        // if url in db - return markup result from db
        const allVisitedUrls = await crawlUrls(url, new Set(), 0, 3);
        res.status(200).json({ url, links: Array.from(allVisitedUrls) });
    } catch (error) {
        res.status(500).send(error);
    }
};

const crawlUrls = async (currentUrl, visited, round, depth) => {
    const normalizedUrl = normalizeUrl(currentUrl);
    if (!normalizedUrl || visited.has(normalizedUrl) || round >= depth) {
        return visited;
    }

    visited.add(normalizedUrl);
    console.log(`Crawling: ${currentUrl}`);

    const htmlContent = await fetchPageContent(currentUrl);
    if (!htmlContent) {
        return visited;
    }
    storeUrlData(normalizedUrl, htmlContent);

    const links = extractLinks(htmlContent);
    for (const link of links) {
        await crawlUrls(link, visited, round + 1, depth);
    }

    return visited;
};

module.exports = {
    saveUrlData
};
