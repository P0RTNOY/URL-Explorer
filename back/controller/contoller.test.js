// controller.test.js

// Import the dependencies and the function to be tested
const { saveUrlData } = require('./recursive_ctrl');

// Mock the dependencies
jest.mock('./utils', () => ({
  fetchPageContent: jest.fn(),
  extractLinks: jest.fn(),
  normalizeUrl: jest.fn(),
}));
jest.mock('../storeURL', () => ({
  storeUrlData: jest.fn(),
}));

// Import the mocked dependencies
const { fetchPageContent, extractLinks, normalizeUrl } = require('./utils');
const { storeUrlData } = require('../storeURL');

describe('saveUrlData', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should save URL data and return visited URLs', async () => {
    // Mock request and response objects
    const req = { body: { url: 'https://example.com' } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock dependencies' return values
    const htmlContent = '<html><body><a href="https://example.com/page1">Page 1</a></body></html>';
    const extractedLinks = ['https://example.com/page1'];
    const normalizedUrl = 'https://example.com';
    const allVisitedUrls = new Set([normalizedUrl, 'https://example.com/page1']);

    fetchPageContent.mockResolvedValue(htmlContent);
    extractLinks.mockReturnValue(extractedLinks);
    normalizeUrl.mockReturnValue(normalizedUrl);

    // Call the function
    await saveUrlData(req, res);

    // Assertions
    expect(fetchPageContent).toHaveBeenCalledWith(req.body.url);
    expect(extractLinks).toHaveBeenCalledWith(htmlContent);
    expect(normalizeUrl).toHaveBeenCalledWith(req.body.url);
    expect(storeUrlData).toHaveBeenCalledWith(normalizedUrl, htmlContent);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ url: req.body.url, links: Array.from(allVisitedUrls) });
  });

  it('should handle error when URL is missing', async () => {
    // Mock request and response objects with missing URL
    const req = { body: {} };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Call the function
    await saveUrlData(req, res);

    // Assertions
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'URL is required' });
    expect(fetchPageContent).not.toHaveBeenCalled();
    expect(extractLinks).not.toHaveBeenCalled();
    expect(normalizeUrl).not.toHaveBeenCalled();
    expect(storeUrlData).not.toHaveBeenCalled();
  });


});
