const axios = require('axios');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const { URL } = require('url');

const fetchPageContent = async (url) => {
    try {
        const response = await axios.get(url);
        const htmlContent = response.data;
        return htmlContent;
    } catch (error) {
        console.error(`Error fetching page content from ${url}:`, error.message);
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
    return hrefLinks;
};

const normalizeUrl = (url) => {
    try {
        const parsedUrl = new URL(url);
        return parsedUrl.hostname+ parsedUrl.pathname;
    } catch (error) {
        console.error(`Error normalizing URL ${url}:`, error.message);
        return null;
    }
};

module.exports = {
    fetchPageContent,
    extractLinks,
    normalizeUrl
}