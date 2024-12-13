const express = require('express');
const router = express.Router();
const storeViewController = require('../../controllers/views/storeViewController.js');
const authenticateToken = require('../../middlewares/authMiddleware.js');
const authorizePermission = require('../../middlewares/authorizePermission.js');

// Render the Users pages
router.get('/page', authenticateToken, authorizePermission('Visualizar Lojas'), storeViewController.getStorePage);
router.get('/add', authenticateToken, authorizePermission('Visualizar Lojas'), storeViewController.getAddStorePage);
router.get('/list', authenticateToken, authorizePermission('Visualizar Lojas'), storeViewController.getAllStores);
router.get('/search', authenticateToken, authorizePermission('Visualizar Lojas'), storeViewController.searchStoresByNumber);
router.get('/edit/:number', authenticateToken, authorizePermission('Visualizar Lojas'), storeViewController.getEditStorePage);

module.exports = router;
