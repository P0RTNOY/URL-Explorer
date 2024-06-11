const express = require('express');
const router = express.Router();
// const urlController = require('../controller/controller');
const urlController = require('../controller/recursive_ctrl');

router.post('/urls', urlController.saveUrlData);
// router.get('/urls', urlController.getAllUrls);
// router.delete('/urls/delete', urlController.deleteAll);

module.exports = router;