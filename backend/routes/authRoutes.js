const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authenticateToken = require('../middlewares/authMiddleware');
const resetPasswordViewController = require('../controllers/views/resetPasswordViewController');

// Login route
router.post('/login', authController.login);

// Logout route
router.post('/logout', authenticateToken, authController.logout);

// Password recovery route
router.post('/forgot-password', authController.forgotPassword);
router.get('/reset-password', resetPasswordViewController.getResetPasswordPage);
router.post('/reset-password', authController.resetPassword);


module.exports = router;
