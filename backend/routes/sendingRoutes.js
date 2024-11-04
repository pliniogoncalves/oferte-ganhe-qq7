const express = require('express');
const router = express.Router();
const sendingController = require('../controllers/sendingController.js');
const { insertSending } = require('../services/sendingService.js')

// Rota para a página de envios
router.get('/sending', sendingController.getUserPage);

// Rota para cadastrar um novo envio
router.post('/sending', async (req, res) => {
    const {quantidade, data, usuario, talao, loja} = req.body;

    try{
        const newSending = await insertSending(quantidade, data, usuario, talao, loja);
        res.status(201).json({ message: 'Envio cadastrado com sucesso!', sending: newSending});
    }catch(erro){
        res.status(500).json({ message: 'Erro ao cadastrar Envio', erro: erro.message});
    }
});

module.exports = router;