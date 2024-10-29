const express = require('express');
const router = express.Router();
const storeController = require('../controllers/storeController.js');

// Rota para a página de usuários
router.get('/store', storeController.getUserPage);

module.exports = router;