const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController.js');
const authenticateToken = require('../Middlewares/authMiddleware.js');

//Debug route to check if 'api/profile' is active
router.get('/', (req, res) =>{
    res.send('Active Profile Route');
});

// Route to Profile page
router.get('/profiles/page', profileController.getProfilePage);

//Define the routes and trigger the controller
router.post('/profiles/register', authenticateToken, profileController.insertProfile);
router.get('/profiles/list', authenticateToken, profileController.searchProfile);
router.get('/profiles/list/:name', authenticateToken, profileController.searchProfileName);
router.put('/profiles/edit/:name', authenticateToken, profileController.editProfile);
router.delete('/profiles/delete/:name', authenticateToken, profileController.removeProfile);

module.exports = router;

