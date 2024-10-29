const app = require('./app'); // Importa o aplicativo do app.js
const PORT = process.env.PORT || 3000; // Define a porta

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log(`Acesse o aplicativo em http://localhost:${PORT}`);
});