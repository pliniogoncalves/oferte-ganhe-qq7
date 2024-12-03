const express = require('express');
const router = express.Router();
const loginViewController = require('../controllers/views/loginViewController.js');
const mainViewController = require('../controllers/views/mainViewController.js');
const userViewController = require('../controllers/views/userViewController.js');
const profileViewController = require('../controllers/views/profileViewController.js');
const authenticateToken = require('../middlewares/authMiddleware.js');
const authorizePermission = require('../middlewares/authorizePermission.js');

// Render the login page
router.get('/login', loginViewController.getLoginPage);

// Render the main page (protected by authentication)
router.get('/main', authenticateToken, authorizePermission('list_users'), mainViewController.getMainPage);

// Render the Users pages
router.get('/users/page', authenticateToken, userViewController.getUserPage);
router.get('/users/add', authenticateToken, userViewController.getAddUserPage);
router.get('/users/search', authenticateToken, userViewController.searchUsersByRegistration);
router.get('/users/edit/:registration', authenticateToken, userViewController.getEditUserPage);

//render the Profile pages
router.get('/profiles/page', authenticateToken, profileViewController.getProfilePage);

module.exports = router;