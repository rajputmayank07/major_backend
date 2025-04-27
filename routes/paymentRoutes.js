const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const { protect } = require('../middleware/authMiddleware');

// user must be logged in to create a payment order
router.post('/order', protect, paymentController.createOrder);

module.exports = router;
