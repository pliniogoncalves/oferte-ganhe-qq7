const express = require('express');
const router = express.Router();
const userViewController = require('../../controllers/views/userViewController.js');
const authenticateToken = require('../../middlewares/authMiddleware.js');

// Render the Users pages
router.get('/page', authenticateToken, userViewController.getUserPage);
router.get('/add', authenticateToken, userViewController.getAddUserPage);
router.get('/list', authenticateToken, userViewController.getAllUsers);
router.get('/search', authenticateToken, userViewController.searchUsersByRegistration);
router.get('/edit/:registration', authenticateToken, userViewController.getEditUserPage);

module.exports = router;
