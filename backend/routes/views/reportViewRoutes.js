const express = require('express');
const router = express.Router();
const reportViewController = require('../../controllers/views/reportViewController.js');
const authenticateToken = require('../../middlewares/authMiddleware.js');

// Render the Reports pages
router.get('/page', authenticateToken, reportViewController.getReportsPage);
router.get('/:report', authenticateToken, reportViewController.viewReport);
router.get('/download/:reportCSV', authenticateToken, reportViewController.downloadReport);

module.exports = router;
