const pool = require('../config/database');

// Função para inserir um novo Modulo
async function insertModule(nome, acesso, funcionalidade) {
    const query = `
        INSERT INTO postgres."oferte-ganhe".Modulo (nome_Modulo, acesso, funcionalidade)
        VALUES ($1, $2, $3)
        RETURNING *;
    `;

    const values = [nome, acesso, funcionalidade];

    try {
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (err) {
        console.error('Erro ao inserir modulo:', err);
        throw err;
    }
}

module.exports = { insertModule };
