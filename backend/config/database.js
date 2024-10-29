const { Pool } = require('pg');

//Configuração do pool de conexão
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'postgres',
    port: 5432,
});

//teste a conexão ao banco de dados
pool.connect((err, client, release) => {
    if(err) {
        return console.error('Erro ao conectar ao banco de dados');
    }
})