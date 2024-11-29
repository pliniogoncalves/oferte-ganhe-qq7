const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/authMiddleware');
const authorizePermission = require('../middlewares/authorizePermission.js');

// Render the login page
router.get('/login', (req, res) => {
  res.render('login', { 
      layout: 'layouts/loginLayout', 
      title: 'Login', 
      messages: res.locals.messages
  });
});

// Render the main page (protected by authentication)
router.get('/main', authenticateToken, authorizePermission('list_users'), (req, res) => {
  res.render('main', { 
    layout: 'layouts/mainLayout', 
    title: 'Página Inicial - Dashboard' 
  });
});

module.exports = router;