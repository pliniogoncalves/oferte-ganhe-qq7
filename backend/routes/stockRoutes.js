const express = require('express');
const router = express.Router();
const stockController = require('../controllers/stockController.js');

// Rota para a página de usuários
router.get('/stock', stockController.getUserPage);

module.exports = router;