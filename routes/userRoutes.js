const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');


// Purchase subscription for existing user
router.post('/purchase',protect, userController.purchase);
// GET meal count
router.get('/meal-count',protect, userController.getMealCount);
module.exports = router;
