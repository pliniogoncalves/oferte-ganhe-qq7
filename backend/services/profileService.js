const pool = require('../config/database');

// Função para inserir um novo Perfil
async function insertProfile(nome, modulo = 'admin') {
    const query = `
        INSERT INTO postgres."oferte-ganhe".Perfil (nome_perfil, id_modulo)
        VALUES ($1, 
            (SELECT id_modulo FROM postgres."oferte-ganhe".Modulo WHERE nome_modulo = $2)
        )
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

//Função para consultar todos os perfis
async function searchProfile() {
    const query =`
        SELECT 
            Perfil.id_perfil, 
            Perfil.nome_perfil, 
            Modulo.nome_modulo
        FROM postgres."oferte-ganhe".Perfil
        JOIN postgres."oferte-ganhe".Modulo ON Perfil.id_modulo = Modulo.id_modulo
    `;

    try{
        const result = await pool.query(query);
        return result.rows;
    }catch(err){
        console.error('Erro ao consultar Perfil:', err);
    }
}

//Função para buscar Perfil por nome
async function searchProfileName(nome) {
    const query = `
        SELECT 
            Perfil.id_perfil, 
            Perfil.nome_perfil, 
            Modulo.nome_modulo
        FROM postgres."oferte-ganhe".Perfil
        JOIN postgres."oferte-ganhe".Modulo ON Perfil.id_modulo = Modulo.id_modulo
        WHERE Perfil.nome_perfil = $1::varchar;
    `;

    const values = [nome];

    try {
        const result = await pool.query(query, values);
        return result.rows[0]; 
    } catch (err) {
        console.error('Erro ao buscar Perfil por nome:', err);
        throw err;
    }
}

//Função para editar um Perfil
async function editProfile(novoNome, modulo, nome) {
    const query = `
        UPDATE postgres."oferte-ganhe".Perfil
        SET nome_perfil = $1,
            id_modulo = (SELECT id_modulo FROM postgres."oferte-ganhe".Modulo WHERE nome_modulo = $2)
        WHERE nome_perfil = $3::varchar
        RETURNING *;
    `;

    const values = [novoNome, modulo, nome];

    try {
        const result = await pool.query(query, values);
        return result.rows[0];
    }catch(err){
        console.error('Erro ao editar perfil:', err);
        throw err;
    }
}

//Função para excluir um perfil
async function removeProfile(nome) {
    const query = `
        DELETE FROM postgres."oferte-ganhe".Perfil
        WHERE nome_perfil = $1::varchar
        RETURNING *;
    `;

    try{
        const result = await pool.query(query, [nome]);
        return result.rows[0];
    }catch (err){
        console.error('Erro ao deletar Perfil:', err);
        throw err;
    }
}

module.exports = { insertProfile, searchProfile, searchProfileName, editProfile, removeProfile };

