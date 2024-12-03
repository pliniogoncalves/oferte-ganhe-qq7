const express = require('express');
const router = express.Router();
const mainViewController = require('../../controllers/views/mainViewController.js');
const authenticateToken = require('../../middlewares/authMiddleware.js');
const authorizePermission = require('../../middlewares/authorizePermission.js');

// Render the main page (protected by authentication)
router.get('/', authenticateToken, authorizePermission('list_users'), mainViewController.getMainPage);

module.exports = router;
