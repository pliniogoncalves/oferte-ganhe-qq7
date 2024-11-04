const pool = require('../config/database');

// Função para inserir um novo recebimento
async function insertReceiving(quantidade, data, usuario, talao, loja) {
    const query = `
        INSERT INTO postgres."oferte-ganhe".recebimento (quantidade_recebido, data_recebimento, id_usuario, id_talao, id_loja)
        VALUES ($1, $2, 
            (SELECT id_usuario FROM postgres."oferte-ganhe".Usuario WHERE nome_usuario = $3), 
            (SELECT id_talao FROM postgres."oferte-ganhe".Talao WHERE remessa = $4),
            SELECT id_loja FROM postgres."oferte-ganhe".Loja WHERE numero_loja = $5))
        RETURNING *;
    `;

    const values = [quantidade, data, usuario, talao, loja];

    try {
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (err) {
        console.error('Erro ao inserir usuário:', err);
        throw err;
    }
}

module.exports = { insertReceiving };
