const express = require('express');
const router = express.Router();
const profileViewController = require('../../controllers/views/profileViewController.js');
const authenticateToken = require('../../middlewares/authMiddleware.js');

// Render the Profile pages
router.get('/page', authenticateToken, profileViewController.getProfilePage);

module.exports = router;