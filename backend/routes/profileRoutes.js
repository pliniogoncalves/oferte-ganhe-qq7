const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController.js');
const { insertProfile, searchProfile, searchProfileName, editProfile, removeProfile } = require('../services/profileService.js')

//Rota de depuração para verificar se o 'api/profile' está ativa
router.get('/', (req, res) =>{
    res.send('Rota de Perfil ativa');
});

// Rota para a página de Perfil
router.get('/profiles/page', profileController.getUserPage);

// Rota para cadastrar um novo Perfil
router.post('/profiles/register', async (req, res) => {
    const {nome, modulo} = req.body;

    try{
        const newProfile = await insertProfile(nome, modulo);
        res.status(201).json({ message: 'Perfil cadastrado com sucesso!', profile: newProfile});
    }catch(erro){
        res.status(500).json({ message: 'Erro ao cadastrar Perfil', erro: erro.message});
    }
});

// Rota para Buscar Todos os Perfis
router.get('/profiles/list', async (req, res) => {
    try {
        const profiles = await searchProfile();
        res.status(200).json(profiles);
    } catch (err) {
        res.status(500).json({ message: 'Erro ao buscar todos os Perfis', error: err.message });
    }
});

// Rota para Buscar um perfil pelo nome
router.get('/profiles/list/:nome', async (req, res) => {
    const { nome } = req.params;

    try {
        const result = await searchProfileName(nome);
        if(result){
            res.status(200).json(result);
        }else{
            res.status(404).json({ message: 'Perfil não encontrado' });
        }
    }catch(err) {
        res.status(500).json({ message: 'Erro ao buscar Perfil', error: err.message });
    }
});

// Rota para editar um Perfil existente
router.put('/profiles/edit/:nome', async (req, res) =>{
    const { nome } = req.params;
    const { novoNome, modulo } = req.body;

    try{
        const updateProfile = await editProfile(novoNome, modulo, nome);
        if (updateProfile) {
            res.status(200).json({ message: 'Perfil atualizado com sucesso!', profile: updateProfile });
        } else {
            res.status(404).json({ message: 'Perfil não encontrado.' });
        }
    } catch (erro) {
        res.status(500).json({ message: 'Erro ao editar Perfil', error: erro.message });
    }

});

// Rota para excluir um Perfil
router.delete('/profiles/delete/:nome', async (req, res) => {
    const { nome } = req.params;

    try{
        const removedProfile = await removeProfile(nome);
        if(removedProfile){
            res.status(200).json({ message: 'Perfil excluído com sucesso!', profile: removedProfile });
        }else{
            res.status(404).json({ message: 'Perfil não encontrado.' });
        }
    }catch(erro){
        res.status(500).json({ message: 'Erro ao excluir Perfil', error: erro.message });
    }
});

module.exports = router;