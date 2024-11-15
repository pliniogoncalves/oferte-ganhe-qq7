const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');

//Debug route to check if 'api/users' is active
router.get('/', (req, res) =>{
    res.send('Rota de Usuário ativa');
});

//Route to the users page
router.get('/users/page', userController.getUserPage);

//Define the routes and trigger the controller
router.post('/users/register', userController.insertUser);
router.get('/users/list', userController.searchUser);
router.get('/users/list/:registration', userController.searchUserMatricula);
router.put('/users/edit/:registration', userController.editUser);
router.delete('/users/delete/:registration', userController.removeUser);

module.exports = router;