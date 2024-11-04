const express = require('express');
const router = express.Router();
const storeController = require('../controllers/storeController.js');
const { insertStore } = require('../services/storeService.js')

// Rota para a página de Lojas
router.get('/store', storeController.getUserPage);

// Rota para cadastrar uma nova Loja
router.post('/store', async (req, res) => {
    const {nome, numero} = req.body;

    try{
        const newStore = await insertStore(nome, numero);
        res.status(201).json({ message: 'Loja cadastrada com sucesso!', store: newStore});
    }catch(erro){
        res.status(500).json({ message: 'Erro ao cadastrar Loja', erro: erro.message});
    }
});

module.exports = router;