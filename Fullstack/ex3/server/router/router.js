//router/router.js
const express = require("express");
const controller = require("../controller/controller");
const logger = require('../logger/logger');
const router = express.Router();

// Middleware to log incoming requests
router.use((req, res, next) => {
    logger.info(`Router received ${req.method} request for ${req.url}`);
    next();
});

// Get all crises
router.get('/crises', controller.getAllCrises);

// Get crisis by ID
router.get('/crises/:id', controller.getCrisisById);

// Add new crisis
router.post('/crises/new', controller.addNewCrisis);

// Update crisis
router.put('/crises/:id', controller.updateCrisis);

// Delete crisis
router.delete('/crises/:id', controller.deleteCrisis);

module.exports = router;

