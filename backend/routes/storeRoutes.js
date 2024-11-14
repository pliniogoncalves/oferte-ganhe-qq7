const express = require('express');
const router = express.Router();
const storeController = require('../controllers/storeController.js');

//Debug route to check if 'api/store' is active
router.get('/', (req, res) =>{
    res.send('Active Store Route');
});

// Route to the Stores page
router.get('/store/page', storeController.getUserPage);

//Define the routes and trigger the controller
router.post('/store/register', storeController.insertStore);
router.get('/store/list', storeController.searchStore);
router.get('/store/list/:number', storeController.searchStoreNumber);
router.put('/store/edit/:number', storeController.editStore);
router.delete('/store/delete/:number', storeController.removeStore);

module.exports = router;

