const express = require('express');
const router = express.Router();
const rfidController = require('../controllers/rfidController');

// Check RFID validity
router.post('/check', rfidController.checkRFID);

// Report dispense status
router.post('/report', rfidController.reportDispense);

module.exports = router;