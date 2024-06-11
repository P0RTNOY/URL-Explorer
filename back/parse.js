const cheerio = require('cheerio');

function extractURLs(html) {
  const $ = cheerio.load(html);
  const urls = [];

  // Extract URLs from anchor tags
  $('a').each((index, element) => {
    const url = $(element).attr('href');
    if (url) {
      urls.push(url);
    }
  });

  return urls;
}

module.exports = extractURLs;