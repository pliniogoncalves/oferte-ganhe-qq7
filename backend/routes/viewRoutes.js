const express = require('express');
const router = express.Router();
const viewController = require('../controllers/viewController');
const authenticateToken = require('../middlewares/authMiddleware');
const authorizePermission = require('../middlewares/authorizePermission.js');

// Render the login page
router.get('/login', viewController.getLoginPage);

// Render the main page (protected by authentication)
router.get('/main', authenticateToken, authorizePermission('list_users'), viewController.getMainPage);

// Render the sidebar pages
router.get('/users/page', authenticateToken, authorizePermission('list_users'), viewController.getUserPage);


module.exports = router;