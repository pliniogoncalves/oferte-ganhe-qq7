const express = require('express');
const router = express.Router();
const permissionController = require('../controllers/permissionController.js');
const authenticateToken = require('../middlewares/authMiddleware.js');

//Debug route to check if 'api/permission' is active
router.get('/', (req, res) =>{
    res.send('Active Permission Route');
});

// Route to Permission page
router.get('/permissions/page', permissionController.getPermissionPage);

//Define the routes and trigger the controller
router.post('/permissions/register', authenticateToken, permissionController.insertPermission);
router.get('/permissions/list', authenticateToken, permissionController.searchPermission);
router.get('/permissions/list/:name', authenticateToken, permissionController.searchPermissionName);
router.put('/permissions/edit/:name', authenticateToken, permissionController.editPermission);
router.delete('/permissions/delete/:name', authenticateToken, permissionController.removePermission);

module.exports = router;

