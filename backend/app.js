const express = require('express');
const path = require('path');
const viewRoutes = require('../backend/routes/viewRoutes.js');
const userRoutes = require('../backend/routes/userRoutes.js'); 

const app = express();

// Middleware para servir arquivos estáticos
app.use(express.static(path.join(__dirname, '../frontend/public')));

// Usar as rotas de visualização
app.use('/', viewRoutes);
app.use('/api', userRoutes);

// Definir uma rota padrão para redirecionar para o login
app.get('/', (req, res) => {
    res.redirect('/login'); // Redireciona para a página de login
});

module.exports = app;