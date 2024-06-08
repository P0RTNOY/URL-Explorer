const express = require('express');
const router = express.Router();
const urlController = require('../controller/controller');

router.post('/urls', urlController.saveUrlData);
// router.get('/urls', urlController.getAllUrls);
// router.delete('/urls/delete', urlController.deleteAll);

module.exports = router;