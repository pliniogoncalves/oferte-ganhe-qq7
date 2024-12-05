const express = require('express');
const router = express.Router();
const storeViewController = require('../../controllers/views/storeViewController.js');
const authenticateToken = require('../../middlewares/authMiddleware.js');

// Render the Users pages
router.get('/page', authenticateToken, storeViewController.getStorePage);
router.get('/add', authenticateToken, storeViewController.getAddStorePage);
router.get('/list', authenticateToken, storeViewController.getAllStores);
router.get('/search', authenticateToken, storeViewController.searchStoresByNumber);
router.get('/edit/:number', authenticateToken, storeViewController.getEditStorePage);

module.exports = router;
