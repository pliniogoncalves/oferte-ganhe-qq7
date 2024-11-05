const pool = require('../config/database');

// Função para inserir um novo Envio
async function insertSending(data, quantidade, usuario, talao, loja) {
    const query = `
        INSERT INTO postgres."oferte-ganhe".Envio (data_envio, quantidade_envio, id_usuario, id_talao, id_loja)
        VALUES ($1, 
            (SELECT id_talao FROM postgres."oferte-ganhe".Talao WHERE quantidade_talao = $2), 
            (SELECT id_usuario FROM postgres."oferte-ganhe".Usuario WHERE nome_usuario = $3), 
            (SELECT id_talao FROM postgres."oferte-ganhe".Talao WHERE remessa = $4),
            (SELECT id_loja FROM postgres."oferte-ganhe".Loja WHERE numero_loja = $5)
        )
        RETURNING *;
    `;

    const values = [data, quantidade, usuario, talao, loja];

    try {
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (err) {
        console.error('Erro ao inserir usuário:', err);
        throw err;
    }
}

module.exports = { insertSending };
