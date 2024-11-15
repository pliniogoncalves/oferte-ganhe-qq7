const express = require('express');
const router = express.Router();
const talaoController = require('../controllers/talonController.js');
const { insertTalao, searchTalao, searchTalaoByStore, editTalao, removeTalao } = require('../services/talonService.js')

//Rota de depuração para verificar se o 'api/taloes' está ativa
router.get('/', (req, res) =>{
    res.send('Rota de Talão ativa');
});

// Rota para a página de Talões
router.get('/taloes/page', talaoController.getUserPage);

// Rota para cadastrar um novo Talão
router.post('/taloes/register', async (req, res) => {
    const {remessa, quantidade, status, estoque} = req.body;

    try{
        const newTalao = await insertTalao(remessa, quantidade, status, estoque);
        res.status(201).json({ message: 'Talao cadastrado com sucesso!', talao: newTalao});
    }catch(erro){
        res.status(500).json({ message: 'Erro ao cadastrar Talão', erro: erro.message});
    }
});

// Rota para Buscar Todos os Talões
router.get('/taloes/list', async (req, res) => {
    try{
        const talao = await searchTalao();
        res.status(200).json(talao);
    }catch(err) {
        res.status(500).json({ message: 'Erro ao buscar todos os talões', error: err.message });
    }
});

// Rota para Buscar um Talao pela loja
router.get('/taloes/list/:loja', async (req, res) => {
    const { loja } = req.params;

    try {
        const result = await searchTalaoByStore(loja);
        if(result){
            res.status(200).json(result);
        }else{
            res.status(404).json({ message: 'Talao não encontrado' });
        }
    }catch(err) {
        res.status(500).json({ message: 'Erro ao buscar Talão', error: err.message });
    }
});

// Rota para editar um Talao existente
router.put('/taloes/edit/:loja', async (req, res) =>{
    const { loja } = req.params;
    const { remessa, quantidade, status } = req.body;

    try{
        const updateTalao = await editTalao(remessa, quantidade, status, loja);
        if (updateTalao) {
            res.status(200).json({ message: 'Talao atualizado com sucesso!', talao: updateTalao });
        } else {
            res.status(404).json({ message: 'Talao não encontrado.' });
        }
    } catch (erro) {
        res.status(500).json({ message: 'Erro ao editar Talao', error: erro.message });
    }

});

// Rota para excluir um estoque
router.delete('/taloes/delete/:loja', async (req, res) => {
    const { loja } = req.params;

    try{
        const removedTalao = await removeTalao(loja);
        if(removedTalao){
            res.status(200).json({ message: 'Talao excluído com sucesso!', talao: removedTalao });
        }else{
            res.status(404).json({ message: 'Talao não encontrado.' });
        }
    }catch(erro){
        res.status(500).json({ message: 'Erro ao excluir Talao', error: erro.message });
    }
});


module.exports = router;