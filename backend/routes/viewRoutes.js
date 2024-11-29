const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/authMiddleware');

// Render the login page
router.get('/login', (req, res) => {
  res.render('login', { errorMessage: null });
});

// Render the main page (protected by authentication)
router.get('/main', authenticateToken, (req, res) => {
  res.render('main');
});

module.exports = router;