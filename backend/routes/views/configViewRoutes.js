const express = require('express');
const router = express.Router();
const configViewController = require('../../controllers/views/configViewController.js');
const authenticateToken = require('../../middlewares/authMiddleware.js');

router.get('/password/:registration', authenticateToken, configViewController.getPasswordPage);
router.put('/password/:registration', authenticateToken, configViewController.updatePassword);

module.exports = router;