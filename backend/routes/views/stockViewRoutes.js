const express = require('express');
const router = express.Router();
const stockViewController = require('../../controllers/views/stockViewController');
const authenticateToken = require('../../middlewares/authMiddleware');
const authorizePermission = require('../../middlewares/authorizePermission.js');

// Render the Stocks pages
router.get('/page', authenticateToken, authorizePermission('Visualizar Estoque'), stockViewController.getStockPage);
router.get('/list', authenticateToken, authorizePermission('Visualizar Estoque'), stockViewController.getAllStocks);
router.get('/search', authenticateToken, authorizePermission('Visualizar Estoque'), stockViewController.searchStocksByNumberStore);
router.get('/edit/:stockId', authenticateToken, authorizePermission('Visualizar Estoque'), stockViewController.getEditStockPage);

module.exports = router;
