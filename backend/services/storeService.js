const pool = require('../config/database');

// Função para inserir um nova Loja
async function insertStore(nome, numero) {
    const query = `
        INSERT INTO postgres."oferte-ganhe".Loja (nome_loja, numero_loja)
        VALUES ($1, $2)
        RETURNING *;
    `;

    const values = [nome, numero];

    try {
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (err) {
        console.error('Erro ao inserir perfil:', err);
        throw err;
    }
}

module.exports = { insertStore };
