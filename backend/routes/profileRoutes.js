const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController.js');

// Rota para a página de usuários
router.get('/profiles', profileController.getUserPage);

module.exports = router;