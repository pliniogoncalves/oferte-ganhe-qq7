const express = require('express');
const router = express.Router();
const profileViewController = require('../../controllers/views/profileViewController');
const authenticateToken = require('../../middlewares/authMiddleware');
const authorizePermission = require('../../middlewares/authorizePermission.js');
const alertPermission = require('../../middlewares/alertPermission.js');

// Render the Profiles pages
router.get('/page', authenticateToken, alertPermission('Visualizar Perfis'), profileViewController.getProfilePage);
router.get('/add', authenticateToken, alertPermission('Visualizar Perfis'), profileViewController.getAddProfilePage);
router.get('/list', authenticateToken, alertPermission('Visualizar Perfis'), profileViewController.getAllProfiles);
router.get('/search', authenticateToken, alertPermission('Visualizar Perfis'), profileViewController.searchProfilesByName);
router.get('/edit/:name', authenticateToken, alertPermission('Visualizar Perfis'), profileViewController.getEditProfilePage);

module.exports = router;
