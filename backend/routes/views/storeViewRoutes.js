const express = require('express');
const router = express.Router();
const storeViewController = require('../../controllers/views/storeViewController.js');
const authenticateToken = require('../../middlewares/authMiddleware.js');
const authorizePermission = require('../../middlewares/authorizePermission.js');
const alertPermission = require('../../middlewares/alertPermission.js');

// Render the Users pages
router.get('/page', authenticateToken, alertPermission('Visualizar Lojas'), storeViewController.getStorePage);
router.get('/add', authenticateToken, alertPermission('Visualizar Lojas'), storeViewController.getAddStorePage);
router.get('/list', authenticateToken, alertPermission('Visualizar Lojas'), storeViewController.getAllStores);
router.get('/search', authenticateToken, alertPermission('Visualizar Lojas'), storeViewController.searchStoresByNumber);
router.get('/edit/:number', authenticateToken, alertPermission('Visualizar Lojas'), storeViewController.getEditStorePage);

module.exports = router;
