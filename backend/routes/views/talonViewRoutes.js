const express = require('express');
const router = express.Router();
const talonViewController = require('../../controllers/views/talonViewController.js');
const authenticateToken = require('../../middlewares/authMiddleware.js');
const authorizePermission = require('../../middlewares/authorizePermission.js');

// Render the Talon pages
router.get('/page', authenticateToken, authorizePermission('Visualizar Taloes'), talonViewController.getTalonPage);
router.get('/add', authenticateToken, authorizePermission('Visualizar Taloes'), talonViewController.getAddTalonPage);
router.get('/list', authenticateToken, authorizePermission('Visualizar Taloes'), talonViewController.getAllTalons);
router.get('/search', authenticateToken, authorizePermission('Visualizar Taloes'), talonViewController.searchTalonById);
router.get('/edit/:id', authenticateToken, authorizePermission('Visualizar Taloes'), talonViewController.getEditTalonPage);
router.get('/update', authenticateToken, authorizePermission('Visualizar Taloes'), talonViewController.getUpdateTalonPage);

module.exports = router;