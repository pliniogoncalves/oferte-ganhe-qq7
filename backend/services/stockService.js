const pool = require('../config/database');

// Função para inserir um novo Estoque
async function insertStock(quantidade_minima, quantidade_recomendada, quantidade_atual, loja) {
    const query = `
        INSERT INTO postgres."oferte-ganhe".Estoque (quantidade_minima, quantidade_recomendada, quantidade_atual, id_loja)
        VALUES ($1, $2, $3, 
            (SELECT id_loja FROM postgres."oferte-ganhe".Loja WHERE id_loja = $4))
        RETURNING *;
    `;

    const values = [quantidade_minima, quantidade_recomendada, quantidade_atual, loja];

    try {
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (err) {
        console.error('Erro ao inserir usuário:', err);
        throw err;
    }
}

module.exports = { insertStock };
