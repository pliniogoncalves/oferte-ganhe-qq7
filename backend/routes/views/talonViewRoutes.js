const express = require('express');
const router = express.Router();
const talonViewController = require('../../controllers/views/talonViewController.js');
const authenticateToken = require('../../middlewares/authMiddleware.js');

// Render the Talon pages
router.get('/page', authenticateToken, talonViewController.getTalonPage);

module.exports = router;