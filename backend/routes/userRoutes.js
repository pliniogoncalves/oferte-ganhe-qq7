const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');
const authenticateToken = require('../Middlewares/authMiddleware.js');

// Debug route to check if 'api/users' is active
router.get('/', (req, res) => {
    res.send('Rota de Usuário ativa');
});

// Route to the users page
router.get('/users/page', authenticateToken, userController.getUserPage);

// Define the routes and trigger the controller
router.post('/users/register', authenticateToken, userController.insertUser);
router.get('/users/list', authenticateToken, userController.searchUser);
router.get('/users/list/:registration', authenticateToken, userController.searchUserRegistration);
router.put('/users/edit/:registration', authenticateToken, userController.editUser);
router.delete('/users/delete/:registration', authenticateToken, userController.removeUser);

module.exports = router;
