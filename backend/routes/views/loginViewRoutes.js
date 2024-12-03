const express = require('express');
const router = express.Router();
const loginViewController = require('../../controllers/views/loginViewController.js');

// Render the login page
router.get('/', loginViewController.getLoginPage);

module.exports = router;
