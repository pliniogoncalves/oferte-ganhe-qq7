const express = require('express');
const router = express.Router();

// Import routes for specific views
const loginViewRoutes = require('./views/loginViewRoutes');
const indexViewRoutes = require('./views/indexViewRoutes');
const mainViewRoutes = require('./views/mainViewRoutes');
const noPermissionViewRoutes = require('./views/noPermissionViewRoutes')
const userViewRoutes = require('./views/userViewRoutes');
const profileViewRoutes = require('./views/profileViewRoutes');
const storeViewRoutes = require('./views/storeViewRoutes');
const stockViewRoutes = require('./views/stockViewRoutes');
const talonViewRoutes = require('./views/talonViewRoutes');
const reportViewRoutes = require('./views/reportViewRoutes');
const configViewRoutes = require('./views/configViewRoutes');

// Mount the view routes
router.use('/login', loginViewRoutes);
router.use('/index', indexViewRoutes);
router.use('/main', mainViewRoutes);
router.use('/nopermission', noPermissionViewRoutes);
router.use('/users', userViewRoutes);
router.use('/profiles', profileViewRoutes);
router.use('/stores', storeViewRoutes);
router.use('/stocks', stockViewRoutes);
router.use('/talons', talonViewRoutes);
router.use('/reports', reportViewRoutes);
router.use('/config', configViewRoutes);


module.exports = router;
