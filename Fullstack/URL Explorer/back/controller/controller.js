const { fetchPageContent, extractLinks, normalizeUrl } = require('./utils');
const { storeUrlData, getStoredUrls, getUrlFromDB, deleteStoredUrls } = require('../storeURL');
const logger = require('../logger/logger');

const getUrls = async () => {
  logger.info('Fetching stored URLs');
  return await getStoredUrls();
}

const deleteUrls = async () => {
  logger.info('Deleting all stored URLs');
  return await deleteStoredUrls();
}

const saveUrlData = async (url, res) => {
  try {
    logger.info(`Starting to save URL data for: ${url}`);
    const allVisitedUrls = await crawlUrls(url, new Set(), 0, 3);
    logger.info(`Successfully saved URL data for: ${url}`);
    res.status(200).json({ url, links: Array.from(allVisitedUrls) });
  } catch (error) {
    logger.error(`Error saving URL data for ${url}: ${error.message}`);
    res.status(500).json({message: error.message});
  }
};

const crawlUrls = async (currentUrl, visited, round, depth) => {
  try {
    const normalizedUrl = normalizeUrl(currentUrl);
    if (!normalizedUrl || visited.has(normalizedUrl) || round >= depth) {
      return visited;
    }
    const dbUrlData = await getUrlFromDB(normalizedUrl);
    visited.add(normalizedUrl);
    logger.info(`Crawling URL: ${currentUrl} (Round: ${round}, Depth: ${depth})`);
    
    const htmlContent = dbUrlData?.htmlContent || await fetchPageContent(currentUrl);
    if (!htmlContent) {
      return visited;
    }
    if (!dbUrlData) {
      await storeUrlData(normalizedUrl, htmlContent);
    }
    const links = extractLinks(htmlContent);
    for (const link of links) {
      await crawlUrls(link, visited, round + 1, depth);
    }
    
    return visited;
  } catch (err) {
    logger.error(`Error crawling URL ${currentUrl}: ${err.message}`);
    return visited;
  }
};

module.exports = {
  saveUrlData,
  getUrls,
  deleteUrls
};
