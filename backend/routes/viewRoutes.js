const express = require('express');
const router = express.Router();
const path = require('path');

// Rota para a página de login
router.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/public/login.html'));
});

module.exports = router;