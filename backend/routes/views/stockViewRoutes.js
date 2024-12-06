const express = require('express');
const router = express.Router();
const stockViewController = require('../../controllers/views/stockViewController');
const authenticateToken = require('../../middlewares/authMiddleware');

// Render the Stocks pages
router.get('/page', authenticateToken, stockViewController.getStockPage);


module.exports = router;
