const axios = require('axios');

async function fetch(url) {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url);
        const html = await page.content();
        await browser.close();
        return html;
      } catch (error) {
        console.error('Error fetching HTML:', error);
        throw error;
      }
    }

module.exports = fetch;