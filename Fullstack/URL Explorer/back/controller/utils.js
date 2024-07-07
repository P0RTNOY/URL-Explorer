const axios = require('axios');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const { URL } = require('url');
const logger = require('../logger/logger');

const fetchPageContent = async (url) => {
  try {
    const response = await axios.get(url);
    const htmlContent = response.data;
    logger.info(`Fetched page content from ${url}`);
    return htmlContent;
  } catch (error) {
    logger.error(`Error fetching page content from ${url}: ${error.message}`);
    return null;
  }
};

const extractLinks = (htmlContent) => {
  const dom = new JSDOM(htmlContent);
  const links = dom.window.document.querySelectorAll('a');
  const hrefLinks = [];
  links.forEach(link => {
    const href = link.href;
    if (href && href.startsWith('https://')) {
      hrefLinks.push(href);
    }
  });
  logger.info(`Extracted ${hrefLinks.length} links`);
  return hrefLinks;
};

const normalizeUrl = (url) => {
  try {
    const parsedUrl = new URL(url);
    const normalized = parsedUrl.hostname + parsedUrl.pathname;
    logger.info(`Normalized URL: ${url} to ${normalized}`);
    return normalized;
  } catch (error) {
    logger.error(`Error normalizing URL ${url}: ${error.message}`);
    return null;
  }
};

module.exports = {
  fetchPageContent,
  extractLinks,
  normalizeUrl
}
