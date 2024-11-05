const pool = require('../config/database');

// Função para inserir um novo Talão
async function insertTalao(remessa, quantidade, status, estoque) {
    const query = `
        INSERT INTO postgres."oferte-ganhe".Talao (remessa, quantidade_talao, status_talao, id_estoque)
        VALUES ($1, $2, $3, 
            (SELECT id_estoque FROM postgres."oferte-ganhe".Estoque WHERE id_loja = $4)
        )
        RETURNING *;
    `;

    const values = [remessa, quantidade, status, estoque];

    try {
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (err) {
        console.error('Erro ao inserir usuário:', err);
        throw err;
    }
}

module.exports = { insertTalao };
