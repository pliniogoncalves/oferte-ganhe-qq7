const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');


//Rota de depuração para verificar se o 'api/users' está ativa
router.get('/', (req, res) =>{
    res.send('Rota de Usuário ativa');
});

// Rota para a página de usuários
router.get('/users/page', userController.getUserPage);

//Define as rotas e aciona o controller
router.post('/users/register', userController.insertUser);
router.get('/users/list', userController.searchUser);
router.get('/users/list/:matricula', userController.searchUserMatricula);
router.put('/users/edit/:matricula', userController.editUser);
router.delete('/users/delete/:matricula', userController.removeUser);

module.exports = router;