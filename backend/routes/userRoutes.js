const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');
const { insertUser, searchUser, searchUserMatricula, editUser, removeUser } = require('../services/userService.js')

//Rota de depuração para verificar se o 'api/users' está ativa
router.get('/', (req, res) =>{
    res.send('Rota de Usuário ativa');
});

// Rota para a página de usuários
router.get('/users/page', userController.getUserPage);

// Rota para cadastrar um novo Usuário
router.post('/users/register', async (req, res) => {
    const {nome, matricula, email, senha, loja, perfil} = req.body;

    try{
        const newUser = await insertUser(nome, matricula, email, senha, loja, perfil);
        res.status(201).json({ message: 'Usuário cadastrado com sucesso!', user: newUser});
    }catch(erro){
        res.status(500).json({ message: 'Erro ao cadastrar usuário', erro: erro.message});
    }
});

// Rota para Buscar Todos os Usuários
router.get('/users/list', async (req, res) => {
    try {
        const users = await searchUser();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: 'Erro ao buscar todos os usuários', error: err.message });
    }
});

// Rota para Buscar um usuário pela matricula
router.get('/users/list/:matricula', async (req, res) => {
    const { matricula } = req.params;

    try {
        const result = await searchUserMatricula(matricula);
        if(result){
            res.status(200).json(result);
        }else{
            res.status(404).json({ message: 'Usuário não encontrado' });
        }
    }catch(err) {
        res.status(500).json({ message: 'Erro ao buscar usuário', error: err.message });
    }
});

// Rota para editar um usuário existente
router.put('/users/edit/:matricula', async (req, res) =>{
    const { matricula } = req.params;
    const { nome, novaMatricula, email, senha, loja, perfil } = req.body;

    try{
        const updateUser = await editUser(nome, novaMatricula, email, senha, loja, perfil, matricula);
        if (updateUser) {
            res.status(200).json({ message: 'Usuário atualizado com sucesso!', user: updateUser });
        } else {
            res.status(404).json({ message: 'Usuário não encontrado.' });
        }
    } catch (erro) {
        res.status(500).json({ message: 'Erro ao editar usuário', error: erro.message });
    }

});

// Rota para excluir um usuário
router.delete('/users/delete/:matricula', async (req, res) => {
    const { matricula } = req.params;

    try{
        const removedUser = await removeUser(matricula);
        if(removedUser){
            res.status(200).json({ message: 'Usuário excluído com sucesso!', user: removedUser });
        }else{
            res.status(404).json({ message: 'Usuário não encontrado.' });
        }
    }catch(erro){
        res.status(500).json({ message: 'Erro ao excluir usuário', error: erro.message });
    }
});

module.exports = router;