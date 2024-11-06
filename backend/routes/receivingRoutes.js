const express = require('express');
const router = express.Router();
const receivingController = require('../controllers/receivingController.js');
const { insertReceiving } = require('../services/receivingService.js')

//Rota de depuração para verificar se o 'api/receiving' está ativa
router.get('/', (req, res) =>{
    res.send('Rota de Recebimento de talão ativa');
});

// Rota para a página de recebimentos
router.get('/receiving', receivingController.getUserPage);

// Rota para cadastrar um novo recebimento
router.post('/receiving', async (req, res) => {
    const {data, quantidade, usuario, talao, loja} = req.body;

    try{
        const newReceiving = await insertReceiving(data, quantidade, usuario, talao, loja);
        res.status(201).json({ message: 'Recebimento cadastrado com sucesso!', receiving: newReceiving});
    }catch(erro){
        res.status(500).json({ message: 'Erro ao cadastrar Recebimento', erro: erro.message});
    }
});

module.exports = router;