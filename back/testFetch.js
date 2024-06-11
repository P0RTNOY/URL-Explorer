const fetchHTML = require('./fetch');
const extractURLs = require('./extract'); 

const url = 'https://www.ynet.co.il'; 

fetch(url)
  .then(html => {
    console.log('HTML content:', html);
    return extractURLs(url);
  })
  .then(urls => {
    console.log('Extracted URLs:', urls);
  })
  .catch(error => {
    console.error('Error:', error);
  });