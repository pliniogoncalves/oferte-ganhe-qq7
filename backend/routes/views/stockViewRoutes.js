const express = require('express');
const router = express.Router();
const stockViewController = require('../../controllers/views/stockViewController');
const authenticateToken = require('../../middlewares/authMiddleware');

// Render the Stocks pages
router.get('/page', authenticateToken, stockViewController.getStockPage);
router.get('/list', authenticateToken, stockViewController.getAllStocks);
router.get('/search', authenticateToken, stockViewController.searchStocksByNumberStore);
router.get('/edit/:stockId', authenticateToken, stockViewController.getEditStockPage);

module.exports = router;
