const express = require('express');
const path = require('path');

//importing routes
const viewRoutes = require('../backend/routes/viewRoutes.js');
const userRoutes = require('../backend/routes/userRoutes.js');
const profileRoutes = require('../backend/routes/profileRoutes.js');
const permissionRoutes = require('../backend/routes/permissionRoutes.js');
const profilePermission = require('../backend/routes/profilePermissionRoutes.js'); 
const talonRoutes = require('../backend/routes/talonRoutes.js');
const stockRoutes = require('../backend/routes/stockRoutes.js');
const storeRoutes = require('../backend/routes/storeRoutes.js');
const transactionRoutes = require('../backend/routes/transactionRoutes');


const app = express();

//Middleware to process JSON
app.use(express.json());

//Middleware for serving static files
app.use(express.static(path.join(__dirname, '../frontend/public')));

//Use view routes
app.use('/', viewRoutes);
app.use('/api', userRoutes);
app.use('/api', profileRoutes);
app.use('/api', permissionRoutes);
app.use('/api', profilePermission);
app.use('/api', talonRoutes);
app.use('/api', stockRoutes);
app.use('/api', storeRoutes);
app.use('/api', transactionRoutes);

//Set a default route to redirect to login
app.get('/', (req, res) => {
    res.redirect('/login');
});

module.exports = app;