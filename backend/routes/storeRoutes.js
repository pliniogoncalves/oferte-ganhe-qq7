const express = require('express');
const router = express.Router();
const storeController = require('../controllers/storeController.js');
const authenticateToken = require('../middlewares/authMiddleware.js');

//Debug route to check if 'api/store' is active
router.get('/', (req, res) =>{
    res.send('Active Store Route');
});

//Define the routes and trigger the controller
router.post('/store/register', authenticateToken, storeController.insertStore);
router.get('/store/list', authenticateToken, storeController.searchStore);
router.get('/store/list/:number', authenticateToken, storeController.searchStoreNumber);
router.put('/store/edit/:number', authenticateToken, storeController.editStore);
router.delete('/store/delete/:number', authenticateToken, storeController.removeStore);

//Export CSV
router.get('/store/export-csv', authenticateToken, storeController.exportStoresCSV);

module.exports = router;

