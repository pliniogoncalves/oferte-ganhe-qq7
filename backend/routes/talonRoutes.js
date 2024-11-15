const express = require('express');
const router = express.Router();
const talonController = require('../controllers/talonController.js');

// Debug route to check if the stub route is active
router.get('/', (req, res) => {
    res.send('Talon route is active');
});

//Route to the Talon page
router.get('/talons/page', talonController.getTalonPage);

//Define the routes and trigger the controller
router.post('/talons/register', talonController.insertTalon);
router.get('/talons/list', talonController.getTalons);
router.get('/talons/list/:id', talonController.getTalonById);
router.put('/talons/update/:id', talonController.updateTalon);
router.delete('/talons/delete/:id', talonController.deleteTalon);

module.exports = router;
