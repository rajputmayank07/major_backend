const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

// All admin routes must pass protect + adminOnly
router.get('/users', protect, adminOnly, adminController.getAllUsers);

module.exports = router;
