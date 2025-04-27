const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

// Everyone can GET the current menu
router.get('/today', menuController.getTodayMenu);

// Admin can add/remove
router.post('/add', protect, adminOnly, menuController.addMenuItem);
router.post('/remove', protect, adminOnly, menuController.removeMenuItem);

module.exports = router;
