const express = require('express');
const router = express.Router();
const stockViewController = require('../../controllers/views/stockViewController');
const authenticateToken = require('../../middlewares/authMiddleware');
const authorizePermission = require('../../middlewares/authorizePermission.js');
const alertPermission = require('../../middlewares/alertPermission.js');

// Render the Stocks pages
router.get('/page', authenticateToken, alertPermission('Visualizar Estoque'), stockViewController.getStockPage);
router.get('/list', authenticateToken, alertPermission('Visualizar Estoque'), stockViewController.getAllStocks);
router.get('/search', authenticateToken, alertPermission('Visualizar Estoque'), stockViewController.searchStocksByNumberStore);
router.get('/edit/:stockId', authenticateToken, alertPermission('Visualizar Estoque'), stockViewController.getEditStockPage);

module.exports = router;
