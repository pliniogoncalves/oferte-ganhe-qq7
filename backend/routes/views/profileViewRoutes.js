const express = require('express');
const router = express.Router();
const profileViewController = require('../../controllers/views/profileViewController');
const authenticateToken = require('../../middlewares/authMiddleware');

// Render the Profiles pages
router.get('/page', authenticateToken, profileViewController.getProfilePage);
router.get('/add', authenticateToken, profileViewController.getAddProfilePage);
router.get('/list', authenticateToken, profileViewController.getAllProfiles);
router.get('/search', authenticateToken, profileViewController.searchProfilesByName);
router.get('/edit/:name', authenticateToken, profileViewController.getEditProfilePage);

module.exports = router;
