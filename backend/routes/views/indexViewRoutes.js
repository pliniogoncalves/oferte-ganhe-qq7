const express = require('express');
const router = express.Router();
const indexViewController = require('../../controllers/views/indexViewController.js');
const authenticateToken = require('../../middlewares/authMiddleware.js');
const authorizePermission = require('../../middlewares/authorizePermission.js');

// Render the index page (protected by authentication)
router.get('/', authenticateToken, authorizePermission('list_users'), indexViewController.getIndexPage);

module.exports = router;
