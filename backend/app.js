const express = require('express');
const path = require('path');
require('dotenv').config();
const cookieParser = require('cookie-parser');

//importing routes
const viewRoutes = require('./routes/viewRoutes.js');
const userRoutes = require('./routes/userRoutes.js');
const profileRoutes = require('./routes/profileRoutes.js');
const permissionRoutes = require('./routes/permissionRoutes.js');
const profilePermission = require('./routes/profilePermissionRoutes.js'); 
const talonRoutes = require('./routes/talonRoutes.js');
const stockRoutes = require('./routes/stockRoutes.js');
const storeRoutes = require('./routes/storeRoutes.js');
const transactionRoutes = require('./routes/transactionRoutes.js');
const authRoutes = require('./routes/authRoutes.js');

const app = express();

//Middleware to process JSON
app.use(express.json());

//Middleware for serving static files
app.use(express.static(path.join(__dirname, '../frontend/public')));

// Middleware to process cookies
app.use(cookieParser());

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
app.use('/api', authRoutes);

//Set a default route to redirect to login
app.get('/', (req, res) => {
    res.redirect('/login');
});

module.exports = app;