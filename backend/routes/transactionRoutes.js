const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController.js');
const authenticateToken = require('../Middlewares/authMiddleware.js');

//Debug route to check if the transaction route is active
router.get('/', (req, res) => {
    res.send('Transaction route is active');
});

//Route to the transaction page
router.get('/transactions/page', transactionController.getTransactionPage)

//Define the routes and trigger the controller
router.post('/transactions/register', authenticateToken, transactionController.insertTransaction);
router.get('/transactions/list', authenticateToken, transactionController.searchTransactions);
router.get('/transactions/list/:id', authenticateToken, transactionController.searchTransactionId);
router.put('/transactions/edit/:id', authenticateToken, transactionController.editTransaction);
router.delete('/transactions/delete/:id', authenticateToken, transactionController.removeTransaction);

module.exports = router;
