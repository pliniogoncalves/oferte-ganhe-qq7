const express = require('express');
const router = express.Router();
const sendingController = require('../controllers/sendingController.js');
const { insertSending, searchSending, searchSendingByTalao, editSending, removeSending } = require('../services/sendingService.js')

//Rota de depuração para verificar se o 'api/sending' está ativa
router.get('/', (req, res) =>{
    res.send('Rota de Envio de Talão ativa');
});

// Rota para a página de envios
router.get('/sending/page', sendingController.getUserPage);

// Rota para cadastrar um novo envio
router.post('/sending/register', async (req, res) => {
    const {data, quantidade, usuario, talao, loja} = req.body;

    try{
        const newSending = await insertSending(data, quantidade, usuario, talao, loja);
        res.status(201).json({ message: 'Envio cadastrado com sucesso!', sending: newSending});
    }catch(erro){
        res.status(500).json({ message: 'Erro ao cadastrar Envio', erro: erro.message});
    }
});

// Rota para Buscar Todos os Envios
router.get('/sending/list', async (req, res) => {
    try {
        const sending = await searchSending();
        res.status(200).json(sending);
    } catch (err) {
        res.status(500).json({ message: 'Erro ao buscar todos os envios', error: err.message });
    }
});

// Rota para Buscar um envio pelo talao
router.get('/sending/list/:talao', async (req, res) => {
    const { talao } = req.params;

    try {
        const result = await searchSendingByTalao(talao);
        if(result){
            res.status(200).json(result);
        }else{
            res.status(404).json({ message: 'Envio não encontrado' });
        }
    }catch(err) {
        res.status(500).json({ message: 'Erro ao buscar Envio', error: err.message });
    }
});

// Rota para editar um Envio existente
router.put('/sending/edit/:talao', async (req, res) =>{
    const { talao } = req.params;
    const { data } = req.body;

    try{
        const updateSending = await editSending(data, talao);
        if (updateSending) {
            res.status(200).json({ message: 'Envio atualizado com sucesso!', sending: updateSending });
        } else {
            res.status(404).json({ message: 'Envio não encontrado.' });
        }
    } catch (erro) {
        res.status(500).json({ message: 'Erro ao editar Envio', error: erro.message });
    }

});

// Rota para excluir um Envio
router.delete('/sending/delete/:talao', async (req, res) => {
    const { talao } = req.params;

    try{
        const removedSending = await removeSending(talao);
        if(removedSending){
            res.status(200).json({ message: 'Envio excluído com sucesso!', sending: removedSending });
        }else{
            res.status(404).json({ message: 'Envio não encontrado.' });
        }
    }catch(erro){
        res.status(500).json({ message: 'Erro ao excluir Envio', error: erro.message });
    }
});

module.exports = router;