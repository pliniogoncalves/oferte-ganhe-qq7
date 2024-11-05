const pool = require('../config/database');

// Função para inserir um novo Usuário
async function insertUser(nome, matricula, email, senha, loja='0', perfil = 'admin') {
    const query = `
        INSERT INTO postgres."oferte-ganhe".Usuario (nome_usuario, matricula_usuario, email_usuario, senha_usuario, id_loja, id_perfil)
        VALUES ($1, $2, $3, $4, 
            (SELECT id_loja FROM postgres."oferte-ganhe".Loja WHERE numero_loja = $5), 
            (SELECT id_perfil FROM postgres."oferte-ganhe".Perfil WHERE nome_perfil = $6)
        )
        RETURNING *;
    `;

    const values = [nome, matricula, email, senha, loja, perfil];

    try {
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (err) {
        console.error('Erro ao inserir usuário:', err);
        throw err;
    }
}

module.exports = { insertUser };
