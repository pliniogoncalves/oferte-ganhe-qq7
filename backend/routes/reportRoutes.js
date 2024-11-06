const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController.js');

//Rota de depuração para verificar se o 'api/report' está ativa
router.get('/', (req, res) =>{
    res.send('Rota de Relatório ativa');
});

// Rota para a página de relatórios
router.get('/report', reportController.getUserPage);

module.exports = router;