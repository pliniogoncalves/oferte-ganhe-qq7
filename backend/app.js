const express = require('express');
const path = require('path');

//importando rotas
const viewRoutes = require('../backend/routes/viewRoutes.js');
const userRoutes = require('../backend/routes/userRoutes.js');
const profileRoutes = require('../backend/routes/profileRoutes.js');
const permissionRoutes = require('../backend/routes/permissionRoutes.js'); 
const talaoRoutes = require('../backend/routes/talaoRoutes.js');
const stockRoutes = require('../backend/routes/stockRoutes.js');
const storeRoutes = require('../backend/routes/storeRoutes.js');
const reportRoutes = require('../backend/routes/reportRoutes.js');
const moduleRoutes = require('../backend/routes/moduleRoutes.js');
const sendingRoutes = require('../backend/routes/sendingRoutes.js');
const receivingRoutes = require('../backend/routes/receivingRoutes.js');

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
app.use('/api', talaoRoutes);
app.use('/api', stockRoutes);
app.use('/api', storeRoutes);
app.use('/api', reportRoutes);
app.use('/api', moduleRoutes);
app.use('/api', sendingRoutes);
app.use('/api', receivingRoutes);


// Definir uma rota padrão para redirecionar para o login
app.get('/', (req, res) => {
    res.redirect('/login'); // Redireciona para a página de login
});

module.exports = app;