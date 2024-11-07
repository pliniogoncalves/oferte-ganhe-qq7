const express = require('express');
const router = express.Router();
const storeController = require('../controllers/storeController.js');
const { insertStore } = require('../services/storeService.js')

//Rota de depuração para verificar se o 'api/store' está ativa
router.get('/', (req, res) =>{
    res.send('Rota de Loja ativa');
});

// Rota para a página de Lojas
router.get('/store/page', storeController.getUserPage);

// Rota para cadastrar uma nova Loja
router.post('/store/register', async (req, res) => {
    const {nome, numero} = req.body;

    try{
        const newStore = await insertStore(nome, numero);
        res.status(201).json({ message: 'Loja cadastrada com sucesso!', store: newStore});
    }catch(erro){
        res.status(500).json({ message: 'Erro ao cadastrar Loja', erro: erro.message});
    }
});

module.exports = router;