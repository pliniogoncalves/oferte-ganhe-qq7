const express = require('express');
const router = express.Router();
const noPermissionViewController = require('../../controllers/views/noPermissionViewController.js');
const authenticateToken = require('../../middlewares/authMiddleware.js');
const authorizePermission = require('../../middlewares/authorizePermission.js');

// Render the main page (protected by authentication)
router.get('/', authenticateToken, noPermissionViewController.getnoPermissionPage);

module.exports = router;
