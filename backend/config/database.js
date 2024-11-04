const { Pool } = require('pg');

//Configuração do pool de conexão
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'postgres',
    port: 5432,
});

//testa a conexão ao banco de dados
pool.connect((err, client, release) => {
    if(err) {
        return console.error('Erro ao conectar ao banco de dados');
    }
    console.log('Conexão realizada com sucesso!');
    release(); 
})

module.exports = pool;