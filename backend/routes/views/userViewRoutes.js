const express = require('express');
const router = express.Router();
const userViewController = require('../../controllers/views/userViewController.js');
const authenticateToken = require('../../middlewares/authMiddleware.js');
const authorizePermission = require('../../middlewares/authorizePermission.js');

// Render the Users pages
router.get('/page', authenticateToken, authorizePermission('Visualizar Usuarios'), userViewController.getUserPage);
router.get('/add', authenticateToken, authorizePermission('Visualizar Usuarios'), userViewController.getAddUserPage);
router.get('/list', authenticateToken, authorizePermission('Visualizar Usuarios'), userViewController.getAllUsers);
router.get('/search', authenticateToken, authorizePermission('Visualizar Usuarios'), userViewController.searchUsersByRegistration);
router.get('/edit/:registration', authenticateToken, authorizePermission('Visualizar Usuarios'), userViewController.getEditUserPage);

module.exports = router;
