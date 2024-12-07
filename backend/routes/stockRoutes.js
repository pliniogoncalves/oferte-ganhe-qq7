const express = require('express');
const router = express.Router();
const stockController = require('../controllers/stockController');
const authenticateToken = require('../middlewares/authMiddleware.js');

//Debug route to check if 'api/stock' is active
router.get('/', (req, res) =>{
    res.send('Stock route is active');
});

//Define the routes and trigger the controller
router.post('/stock/register', authenticateToken, stockController.insertStock);
router.get('/stock/list', authenticateToken, stockController.searchStocks);
router.get('/stock/paginated', authenticateToken, stockController.getPaginatedStocks);
router.get('/stock/list/:id', authenticateToken, stockController.searchStockById);
router.put('/stock/edit/:id?', authenticateToken, stockController.editStock);
router.delete('/stock/delete/:id', authenticateToken, stockController.removeStock);

//Export CSV
router.get('/stock/export-csv', authenticateToken, stockController.exportStocksCSV);

module.exports = router;