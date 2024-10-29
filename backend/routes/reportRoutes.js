const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController.js');

// Rota para a página de usuários
router.get('/report', reportController.getUserPage);

module.exports = router;