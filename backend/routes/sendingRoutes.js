const express = require('express');
const router = express.Router();
const sendingController = require('../controllers/sendingController.js');
const { insertSending } = require('../services/sendingService.js')

//Rota de depuração para verificar se o 'api/sending' está ativa
router.get('/', (req, res) =>{
    res.send('Rota de Envio de Talão ativa');
});

// Rota para a página de envios
router.get('/sending', sendingController.getUserPage);

// Rota para cadastrar um novo envio
router.post('/sending', async (req, res) => {
    const {data, quantidade, usuario, talao, loja} = req.body;

    try{
        const newSending = await insertSending(data, quantidade, usuario, talao, loja);
        res.status(201).json({ message: 'Envio cadastrado com sucesso!', sending: newSending});
    }catch(erro){
        res.status(500).json({ message: 'Erro ao cadastrar Envio', erro: erro.message});
    }
});

module.exports = router;