const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authenticateToken = require('../middlewares/authMiddleware');

// Login route
router.post('/login', authController.login);

// Logout route
router.post('/logout', authenticateToken, authController.logout);

module.exports = router;
