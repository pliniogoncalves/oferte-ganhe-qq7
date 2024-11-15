const express = require('express');
const router = express.Router();
const stockController = require('../controllers/stockController');

//Debug route to check if 'api/stock' is active
router.get('/', (req, res) =>{
    res.send('Stock route is active');
});

// Route to the Stock page
router.get('/stock/page', stockController.getStockPage);

//Define the routes and trigger the controller
router.post('/stock/register', stockController.insertStock);
router.get('/stock/list', stockController.searchStocks);
router.get('/stock/list/:id', stockController.searchStockById);
router.put('/stock/edit/:id', stockController.editStock);
router.delete('/stock/delete/:id', stockController.removeStock);

module.exports = router;