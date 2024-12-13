const express = require('express');
const router = express.Router();
const talonController = require('../controllers/talonController.js');
const authenticateToken = require('../middlewares/authMiddleware.js');

// Debug route to check if the stub route is active
router.get('/', (req, res) => {
    res.send('Talon route is active');
});

//Define the routes and trigger the controller
router.post('/talons/register', authenticateToken, talonController.insertTalon);
router.get('/talons/list', authenticateToken, talonController.searchTalons);
router.get('/talons/list/:id', authenticateToken, talonController.searchTalonId);
router.get('/talons/details/:id', authenticateToken, talonController.getTalonDetails);
router.put('/talons/update/:id', authenticateToken, talonController.updateTalon);
router.put('/talons/edit/:id', authenticateToken, talonController.editTalon);
router.delete('/talons/delete/:id', authenticateToken, talonController.removeTalon);

//Export CSV
router.get('/talons/export-csv', authenticateToken, talonController.exportTalonsCSV);
router.get('/talons/export-csv/:id', authenticateToken, talonController.exportIndividualTalonCSV);

module.exports = router;
