import { fetchPageContent, extractLinks, normalizeUrl } from '../controller/utils.js';
import axios from 'axios';
import { JSDOM } from 'jsdom';

jest.mock('axios');

describe('Utils Tests', () => {
  describe('fetchPageContent', () => {
    it('should fetch page content from a URL', async () => {
      const url = 'https://example.com';
      const htmlContent = '<html></html>';
      axios.get.mockResolvedValue({ data: htmlContent });

      const content = await fetchPageContent(url);
      expect(content).toBe(htmlContent);
    });

    it('should handle errors and return null', async () => {
      const url = 'https://example.com';
      axios.get.mockRejectedValue(new Error('Network error'));

      const content = await fetchPageContent(url);
      expect(content).toBeNull();
    });
  });

  describe('extractLinks', () => {
    it('should extract links from HTML content', () => {
      const htmlContent = '<html><a href="https://example.com/">Example</a></html>'; // Updated HTML content
      const links = extractLinks(htmlContent);
      expect(links).toEqual(['https://example.com/']); // Updated expected value
    });
  });

  describe('normalizeUrl', () => {
    it('should normalize a URL', () => {
      const url = 'https://example.com/path';
      const normalizedUrl = normalizeUrl(url);
      expect(normalizedUrl).toBe('example.com/path');
    });

    it('should return null for invalid URLs', () => {
      const url = 'invalid-url';
      const normalizedUrl = normalizeUrl(url);
      expect(normalizedUrl).toBeNull();
    });
  });
});
