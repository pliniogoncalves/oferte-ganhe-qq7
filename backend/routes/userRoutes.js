const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');

//Debug route to check if 'api/store' is active
router.get('/', (req, res) =>{
    res.send('Rota de Usuário ativa');
});

// Rota para a página de usuários
router.get('/users/page', userController.getUserPage);

//Define the routes and trigger the controller
router.post('/users/register', userController.insertUser);
router.get('/users/list', userController.searchUser);
router.get('/users/list/:matricula', userController.searchUserMatricula);
router.put('/users/edit/:matricula', userController.editUser);
router.delete('/users/delete/:matricula', userController.removeUser);

module.exports = router;