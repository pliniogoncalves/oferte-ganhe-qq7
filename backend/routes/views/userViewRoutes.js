const express = require('express');
const router = express.Router();
const userViewController = require('../../controllers/views/userViewController.js');
const authenticateToken = require('../../middlewares/authMiddleware.js');
const authorizePermission = require('../../middlewares/authorizePermission.js');
const alertPermission = require('../../middlewares/alertPermission.js');

// Render the Users pages
router.get('/page', authenticateToken, alertPermission('Visualizar Usuarios'), userViewController.getUserPage);
router.get('/add', authenticateToken, alertPermission('Visualizar Usuarios'), userViewController.getAddUserPage);
router.get('/list', authenticateToken, alertPermission('Visualizar Usuarios'), userViewController.getAllUsers);
router.get('/search', authenticateToken, alertPermission('Visualizar Usuarios'), userViewController.searchUsersByRegistration);
router.get('/edit/:registration', authenticateToken, alertPermission('Visualizar Usuarios'), userViewController.getEditUserPage);

module.exports = router;
