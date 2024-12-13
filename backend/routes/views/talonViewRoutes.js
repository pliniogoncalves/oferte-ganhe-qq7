const express = require('express');
const router = express.Router();
const talonViewController = require('../../controllers/views/talonViewController.js');
const authenticateToken = require('../../middlewares/authMiddleware.js');
const authorizePermission = require('../../middlewares/authorizePermission.js');
const alertPermission = require('../../middlewares/alertPermission.js');

// Render the Talon pages
router.get('/page', authenticateToken, alertPermission('Visualizar Taloes'), talonViewController.getTalonPage);
router.get('/add', authenticateToken, alertPermission('Visualizar Taloes'), talonViewController.getAddTalonPage);
router.get('/list', authenticateToken, alertPermission('Visualizar Taloes'), talonViewController.getAllTalons);
router.get('/search', authenticateToken, alertPermission('Visualizar Taloes'), talonViewController.searchTalonById);
router.get('/edit/:id', authenticateToken, alertPermission('Visualizar Taloes'), talonViewController.getEditTalonPage);
router.get('/update', authenticateToken, alertPermission('Visualizar Taloes'), talonViewController.getUpdateTalonPage);

module.exports = router;