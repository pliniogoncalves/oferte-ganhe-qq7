const express = require('express');
const router = express.Router();

// Import routes for specific views
const loginViewRoutes = require('./views/loginViewRoutes');
const indexViewRoutes = require('./views/indexViewRoutes');
const mainViewRoutes = require('./views/mainViewRoutes');
const userViewRoutes = require('./views/userViewRoutes');
const profileViewRoutes = require('./views/profileViewRoutes');
const storeViewRoutes = require('./views/storeViewRoutes');
const stockViewRoutes = require('./views/stockViewRoutes');
const talonViewRoutes = require('./views/talonViewRoutes');

// Mount the view routes
router.use('/login', loginViewRoutes);
router.use('/index', indexViewRoutes);
router.use('/main', mainViewRoutes);
router.use('/users', userViewRoutes);
router.use('/profiles', profileViewRoutes);
router.use('/stores', storeViewRoutes);
router.use('/stocks', stockViewRoutes);
router.use('/talons', talonViewRoutes);

module.exports = router;
