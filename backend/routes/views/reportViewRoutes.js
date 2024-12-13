const express = require('express');
const router = express.Router();
const reportViewController = require('../../controllers/views/reportViewController.js');
const authenticateToken = require('../../middlewares/authMiddleware.js');
const authorizePermission = require('../../middlewares/authorizePermission.js');

// Render the Reports pages
router.get('/page', authenticateToken, authorizePermission('Visualizar Relatorios'), reportViewController.getReportsPage);
router.get('/:report', authenticateToken, authorizePermission('Visualizar Relatorios'),  reportViewController.viewReport);
router.get('/download/:reportCSV', authenticateToken, authorizePermission('Visualizar Relatorios'),  reportViewController.downloadReport);

module.exports = router;
