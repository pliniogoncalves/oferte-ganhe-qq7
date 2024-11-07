const express = require('express');
const router = express.Router();
const receivingController = require('../controllers/receivingController.js');
const { insertReceiving, searchReceiving, searchReceivingByTalao, editReceiving, removeReceiving } = require('../services/receivingService.js')

//Rota de depuração para verificar se o 'api/receiving' está ativa
router.get('/', (req, res) =>{
    res.send('Rota de Recebimento de talão ativa');
});

// Rota para a página de recebimentos
router.get('/receiving/page', receivingController.getUserPage);

// Rota para cadastrar um novo recebimento
router.post('/receiving/register', async (req, res) => {
    const {data, quantidade, usuario, talao, loja} = req.body;

    try{
        const newReceiving = await insertReceiving(data, quantidade, usuario, talao, loja);
        res.status(201).json({ message: 'Recebimento cadastrado com sucesso!', receiving: newReceiving});
    }catch(erro){
        res.status(500).json({ message: 'Erro ao cadastrar Recebimento', erro: erro.message});
    }
});

// Rota para Buscar Todos os Recebimentos
router.get('/receiving/list', async (req, res) => {
    try {
        const receiving = await searchReceiving();
        res.status(200).json(receiving);
    } catch (err) {
        res.status(500).json({ message: 'Erro ao buscar todos os recebimentos', error: err.message });
    }
});

// Rota para Buscar um recebimento pelo talao
router.get('/receiving/list/:talao', async (req, res) => {
    const { talao } = req.params;

    try {
        const result = await searchReceivingByTalao(talao);
        if(result){
            res.status(200).json(result);
        }else{
            res.status(404).json({ message: 'Recebimento não encontrado' });
        }
    }catch(err) {
        res.status(500).json({ message: 'Erro ao buscar Recebimento', error: err.message });
    }
});

// Rota para editar um Recebimento existente
router.put('/receiving/edit/:talao', async (req, res) =>{
    const { talao } = req.params;
    const { data } = req.body;

    try{
        const updateReceiving = await editReceiving(data, talao);
        if (updateReceiving) {
            res.status(200).json({ message: 'Recebimento atualizado com sucesso!', receiving: updateReceiving });
        } else {
            res.status(404).json({ message: 'Recebimento não encontrado.' });
        }
    } catch (erro) {
        res.status(500).json({ message: 'Erro ao editar Recebimento', error: erro.message });
    }

});

// Rota para excluir um Recebimento
router.delete('/receiving/delete/:talao', async (req, res) => {
    const { talao } = req.params;

    try{
        const removedReceiving = await removeReceiving(talao);
        if(removedReceiving){
            res.status(200).json({ message: 'Recebimento excluído com sucesso!', receiving: removedReceiving });
        }else{
            res.status(404).json({ message: 'Recebimento não encontrado.' });
        }
    }catch(erro){
        res.status(500).json({ message: 'Erro ao excluir Recebimento', error: erro.message });
    }
});

module.exports = router;