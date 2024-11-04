const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');
const { insertUser } = require('../services/userService.js')

// Rota para a página de usuários
router.get('/users', userController.getUserPage);

// Rota para cadastrar um novo Usuário
router.post('/rusers', async (req, res) => {
    const {nome, matricula, email, senha, loja, perfil} = req.body;

    try{
        const newUser = await insertUser(nome, matricula, email, senha, loja, perfil);
        res.status(201).json({ message: 'Usuário cadastrado com sucesso!', user: newUser});
    }catch(erro){
        res.status(500).json({ message: 'Erro ao cadastrar usuário', erro: erro.message});
    }
});

module.exports = router;