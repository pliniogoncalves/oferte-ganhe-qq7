const express = require('express');
const router = express.Router();
const talaoController = require('../controllers/talaoController.js');

// Rota para a página de usuários
router.get('/taloes', talaoController.getUserPage);

module.exports = router;