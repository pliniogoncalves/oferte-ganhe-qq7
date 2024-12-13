const express = require('express');
const router = express.Router();
const profileViewController = require('../../controllers/views/profileViewController');
const authenticateToken = require('../../middlewares/authMiddleware');
const authorizePermission = require('../../middlewares/authorizePermission.js');

// Render the Profiles pages
router.get('/page', authenticateToken, authorizePermission('Visualizar Perfis'), profileViewController.getProfilePage);
router.get('/add', authenticateToken, authorizePermission('Visualizar Perfis'), profileViewController.getAddProfilePage);
router.get('/list', authenticateToken, authorizePermission('Visualizar Perfis'), profileViewController.getAllProfiles);
router.get('/search', authenticateToken, authorizePermission('Visualizar Perfis'), profileViewController.searchProfilesByName);
router.get('/edit/:name', authenticateToken, authorizePermission('Visualizar Perfis'), profileViewController.getEditProfilePage);

module.exports = router;
