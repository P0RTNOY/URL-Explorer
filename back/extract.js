
const puppeteer = require('puppeteer');

async function extract(url) {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    
    // Extract URLs using page.evaluate
    const urls = await page.evaluate(() => {
      const links = Array.from(document.querySelectorAll('a'));
      return links.map(link => link.href);
    });

    await browser.close();
    return urls;
  } catch (error) {
    console.error('Error extracting URLs:', error);
    throw error;
  }
}

module.exports = extract;
