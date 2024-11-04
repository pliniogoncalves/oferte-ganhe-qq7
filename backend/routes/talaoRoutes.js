const express = require('express');
const router = express.Router();
const talaoController = require('../controllers/talaoController.js');
const { insertTalao } = require('../services/talaoService.js')

// Rota para a página de Talões
router.get('/taloes', talaoController.getUserPage);

// Rota para cadastrar um novo Talão
router.post('/taloes', async (req, res) => {
    const {remessa, quantidade, status, estoque} = req.body;

    try{
        const newTalao = await insertTalao(remessa, quantidade, status, estoque);
        res.status(201).json({ message: 'Talao cadastrado com sucesso!', talao: newTalao});
    }catch(erro){
        res.status(500).json({ message: 'Erro ao cadastrar Talão', erro: erro.message});
    }
});

module.exports = router;