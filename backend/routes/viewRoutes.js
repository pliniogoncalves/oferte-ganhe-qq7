const express = require('express');
const router = express.Router();

// Import routes for specific views
const loginViewRoutes = require('./views/loginViewRoutes');
const mainViewRoutes = require('./views/mainViewRoutes');
const userViewRoutes = require('./views/userViewRoutes');
const profileViewRoutes = require('./views/profileViewRoutes');

// Mount the view routes
router.use('/login', loginViewRoutes);
router.use('/main', mainViewRoutes);
router.use('/users', userViewRoutes);
router.use('/profiles', profileViewRoutes);

module.exports = router;
