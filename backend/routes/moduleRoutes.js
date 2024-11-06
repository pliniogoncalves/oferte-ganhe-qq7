const express = require('express');
const router = express.Router();
const moduleController = require('../controllers/moduleController.js');
const { insertModule } = require('../services/moduleService.js')

//Rota de depuração para verificar se o 'api/module' está ativa
router.get('/', (req, res) =>{
    res.send('Rota de Modulo ativa');
});

// Rota para a página de Modulos
router.get('/module', moduleController.getUserPage);

// Rota para cadastrar um novo modulo
router.post('/module', async (req, res) => {
    const {nome, acesso, funcionalidade} = req.body;

    try{
        const newModule = await insertModule(nome, acesso, funcionalidade);
        res.status(201).json({ message: 'Modulo cadastrado com sucesso!', store: newModule});
    }catch(erro){
        res.status(500).json({ message: 'Erro ao cadastrar Modulo', erro: erro.message});
    }
});

module.exports = router;