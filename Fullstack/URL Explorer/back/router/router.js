const express = require('express');
const router = express.Router();
const urlController = require('../controller/controller');

// Handle POST request to save a URL and fetch its links
router.post('/urls', async (req, res) => {
    const url = req.body.url || req.query.url;
    if (!url) {
        return res.status(400).json({ error: 'URL is required' });
    }
    try {
        await urlController.saveUrlData(url, res);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Handle GET request to retrieve stored URLs
router.get('/urls', async (req, res) => {
    try {
        const urls = await urlController.getUrls();
        res.status(200).json(urls);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Handle DELETE request to delete all URLs
router.delete('/urls', async (req, res) => {
    try {
        await urlController.deleteUrls();
        res.status(200).json({ message: 'All URLs deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
