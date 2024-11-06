const express = require('express');
const router = express.Router();
const stockController = require('../controllers/stockController.js');
const { insertStock } = require('../services/stockService.js');

//Rota de depuração para verificar se o 'api/stock' está ativa
router.get('/', (req, res) =>{
    res.send('Rota de Estoque ativa');
});

// Rota para a página de Estoque
router.get('/stock', stockController.getUserPage);

// Rota para cadastrar um novo Estoque
router.post('/stock', async (req, res) => {
    const {quantidade_minima, quantidade_recomendada, quantidade_atual, loja} = req.body;

    try{
        const newStock = await insertStock(quantidade_minima, quantidade_recomendada, quantidade_atual, loja);
        res.status(201).json({ message: 'Estoque cadastrado com sucesso!', Stock: newStock});
    }catch(erro){
        res.status(500).json({ message: 'Erro ao cadastrar Estoque', erro: erro.message});
    }
});

module.exports = router;