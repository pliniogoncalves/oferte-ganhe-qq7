const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');

// Rota para a página de usuários
router.get('/users', userController.getUserPage);

module.exports = router;