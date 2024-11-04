const pool = require('../config/database');

// Função para inserir um novo Usuário
async function insertProfile(nome, modulo = 'admin') {
    const query = `
        INSERT INTO postgres."oferte-ganhe".Perfil (nome_perfil, id_modulo)
        VALUES ($1, 
            (SELECT id_modulo FROM postgres."oferte-ganhe".Modulo WHERE nome_modulo = $2)
        RETURNING *;
    `;

    const values = [nome, modulo];

    try {
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (err) {
        console.error('Erro ao inserir perfil:', err);
        throw err;
    }
}

module.exports = { insertProfile };
