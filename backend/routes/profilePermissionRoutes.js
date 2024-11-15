const express = require('express');
const router = express.Router();
const profilePermissionController = require('../controllers/profilePermissionController.js');

//Debug route to check if 'api/profile-Permission' is active
router.get('/', (req, res) => {
    res.send('Active Profile Permission Route');
});

//Route to Profile-Permission page
router.get('/profile-permissions/page', profilePermissionController.getProfilePermissionPage);

//Define the routes and trigger the controller
router.post('/profile-permissions/register', profilePermissionController.insertProfilePermission);
router.get('/profile-permissions/list', profilePermissionController.getAllProfilesWithPermissions);
router.get('/profile-permissions/list/:id_profile', profilePermissionController.getPermissionsByProfile);
router.delete('/profile-permissions/delete/:id_profile/:id_permission', profilePermissionController.removePermissionFromProfile);

module.exports = router;

