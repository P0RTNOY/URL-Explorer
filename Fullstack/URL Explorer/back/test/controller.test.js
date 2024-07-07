import mongoose from 'mongoose';
import { jest, describe, it, expect, beforeEach, afterEach, afterAll } from '@jest/globals';
import { saveUrlData, getUrls, deleteUrls } from '../controller/controller.js';
import sinon from 'sinon';
import * as utils from '../controller/utils.js';
import Url from '../model/url.js';

describe('Controller Tests', () => {
  beforeEach(() => {
    sinon.restore();  // Clear previous stubs or mocks
  });

  afterAll(async () => {
    await mongoose.connection.close();  // Ensure connection is closed
  });

  describe('saveUrlData', () => {
    it('should fetch page content and store URL data', async () => {
      const url = 'https://example.com';
      const htmlContent = '<html><a href="https://example.com/page1">Page 1</a></html>';
      const links = ['https://example.com/page1'];

      sinon.stub(utils, 'fetchPageContent').resolves(htmlContent);
      sinon.stub(utils, 'extractLinks').returns(links);
      sinon.stub(utils, 'normalizeUrl').returns(url);
      sinon.stub(Url.prototype, 'save').resolves();

      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      await saveUrlData(url, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ url, links });
    }, 10000);  // Increase timeout to 10 seconds

    it('should handle errors and send a 500 response', async () => {
      const url = 'https://example.com';
      const error = new Error('Fetch error');
      sinon.stub(utils, 'fetchPageContent').rejects(error);

      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };  // Changed from send to json
      await saveUrlData(url, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: error.message });  // Changed from send to json
    });
  });

  describe('getUrls', () => {
    it('should retrieve all URLs from the database', async () => {
      const urls = [{ url: 'https://example.com', htmlContent: '<html></html>' }];
      sinon.stub(Url, 'find').resolves(urls);

      const result = await getUrls();
      expect(result).toEqual(urls);
    });
  });

  describe('deleteUrls', () => {
    it('should delete all URLs from the database', async () => {
      const deleteManyStub = sinon.stub(Url, 'deleteMany').resolves({ deletedCount: 1 });

      await deleteUrls();
      expect(deleteManyStub).toHaveBeenCalledWith({});
    });
  });
});
