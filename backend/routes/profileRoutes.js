const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController.js');
const { insertProfile } = require('../services/profileService.js')

// Rota para a página de Perfil
router.get('/profiles', profileController.getUserPage);

// Rota para cadastrar um novo Perfil
router.post('/profiles', async (req, res) => {
    const {nome, modulo} = req.body;

    try{
        const newProfile = await insertProfile(nome, modulo);
        res.status(201).json({ message: 'Perfil cadastrado com sucesso!', profile: newProfile});
    }catch(erro){
        res.status(500).json({ message: 'Erro ao cadastrar Perfil', erro: erro.message});
    }
});

module.exports = router;