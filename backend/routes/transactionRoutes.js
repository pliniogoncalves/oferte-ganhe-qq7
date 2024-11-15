const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController.js');

//Debug route to check if the transaction route is active
router.get('/', (req, res) => {
    res.send('Transaction route is active');
});

//Route to the transaction page
router.get('/transactions/page', transactionController.getTransactionPage)

//Define the routes and trigger the controller
router.post('/transactions/register', transactionController.insertTransaction);
router.get('/transactions/list', transactionController.searchTransactions);
router.get('/transactions/list/:id', transactionController.searchTransactionId);
router.put('/transactions/edit/:id', transactionController.editTransaction);
router.delete('/transactions/delete/:id', transactionController.removeTransaction);

module.exports = router;
