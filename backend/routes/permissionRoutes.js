const express = require('express');
const router = express.Router();
const permissionController = require('../controllers/permissionController.js');

//Debug route to check if 'api/permission' is active
router.get('/', (req, res) =>{
    res.send('Active Permission Route');
});

// Route to Permission page
router.get('/permissions/page', permissionController.getUserPage);

//Define the routes and trigger the controller
router.post('/permissions/register', permissionController.insertPermission);
router.get('/permissions/list', permissionController.searchPermission);
router.get('/permissions/list/:name', permissionController.searchPermissionName);
router.put('/permissions/edit/:name', permissionController.editPermission);
router.delete('/permissions/delete/:name', permissionController.removePermission);

module.exports = router;

