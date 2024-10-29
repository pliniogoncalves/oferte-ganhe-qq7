const express = require('express');
const path = require('path');
const viewRoutes = require('../backend/routes/viewRoutes');

const app = express();

// Middleware para servir arquivos estáticos
app.use(express.static(path.join(__dirname, '../frontend/public')));

// Usar as rotas de visualização
app.use('/', viewRoutes);

// Definir uma rota padrão para redirecionar para o login
app.get('/', (req, res) => {
    res.redirect('/login');
});

module.exports = app;