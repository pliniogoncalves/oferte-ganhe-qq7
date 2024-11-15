const express = require('express');
const path = require('path');

//importando rotas
const viewRoutes = require('../backend/routes/viewRoutes.js');
const userRoutes = require('../backend/routes/userRoutes.js');
const profileRoutes = require('../backend/routes/profileRoutes.js');
const permissionRoutes = require('../backend/routes/permissionRoutes.js');
const profilePermission = require('../backend/routes/profilePermissionRoutes.js'); 
const talonRoutes = require('../backend/routes/talonRoutes.js');
const stockRoutes = require('../backend/routes/stockRoutes.js');
const storeRoutes = require('../backend/routes/storeRoutes.js');


const app = express();

// Middleware para processar JSON
app.use(express.json());

// Middleware para servir arquivos estáticos
app.use(express.static(path.join(__dirname, '../frontend/public')));

// Usar as rotas de visualização
app.use('/', viewRoutes);
app.use('/api', userRoutes);
app.use('/api', profileRoutes);
app.use('/api', permissionRoutes);
app.use('/api', profilePermission);
app.use('/api', talonRoutes);
app.use('/api', stockRoutes);
app.use('/api', storeRoutes);

// Definir uma rota padrão para redirecionar para o login
app.get('/', (req, res) => {
    res.redirect('/login'); // Redireciona para a página de login
});

module.exports = app;