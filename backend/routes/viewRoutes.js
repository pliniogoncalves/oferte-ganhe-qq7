const express = require('express');
const router = express.Router();
const path = require('path');

// Rota para a página de login
router.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/views/login.html'));
});

// Rota para a página inicial / dashboard
router.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/public/views/main.html'));
});

module.exports = router;