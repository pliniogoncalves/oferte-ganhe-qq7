const express = require('express');
const router = express.Router();
const talonViewController = require('../../controllers/views/talonViewController.js');
const authenticateToken = require('../../middlewares/authMiddleware.js');

// Render the Talon pages
router.get('/page', authenticateToken, talonViewController.getTalonPage);
router.get('/add', authenticateToken, talonViewController.getAddTalonPage);
router.get('/edit/:id', authenticateToken, talonViewController.getEditTalonPage);
router.get('/update', authenticateToken, talonViewController.getUpdateTalonPage);

module.exports = router;