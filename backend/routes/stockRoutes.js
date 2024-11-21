const express = require('express');
const router = express.Router();
const stockController = require('../controllers/stockController');
const authenticateToken = require('../Middlewares/authMiddleware.js');

//Debug route to check if 'api/stock' is active
router.get('/', (req, res) =>{
    res.send('Stock route is active');
});

// Route to the Stock page
router.get('/stock/page', stockController.getStockPage);

//Define the routes and trigger the controller
router.post('/stock/register', authenticateToken, stockController.insertStock);
router.get('/stock/list', authenticateToken, stockController.searchStocks);
router.get('/stock/list/:id', authenticateToken, stockController.searchStockById);
router.put('/stock/edit/:id', authenticateToken, stockController.editStock);
router.delete('/stock/delete/:id', authenticateToken, stockController.removeStock);

module.exports = router;