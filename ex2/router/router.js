const express = require("express");
const controller = require("../controller/controller");
const router = express.Router();

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
