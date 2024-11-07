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

    try{
        const result = await pool.query(query, values);
        return result.rows[0];
    }catch(err){
        console.error('Erro ao inserir usuário:', err);
        throw err;
    }
}

//Função para consultar todos os usuários
async function searchUser() {
    const query =`
        SELECT 
            Usuario.id_usuario, 
            Usuario.nome_usuario, 
            Usuario.matricula_usuario, 
            Usuario.email_usuario, 
            Usuario.senha_usuario,
            Loja.numero_loja, 
            Perfil.nome_perfil
        FROM postgres."oferte-ganhe".Usuario
        JOIN postgres."oferte-ganhe".Loja ON Usuario.id_loja = Loja.id_loja
        JOIN postgres."oferte-ganhe".Perfil ON Usuario.id_perfil = Perfil.id_perfil
    `;

    try{
        const result = await pool.query(query);
        return result.rows;
    }catch(err){
        console.error('Erro ao consultar usuário:', err);
    }
}

//Função para buscar usuário por matricula
async function searchUserMatricula(matricula) {
    const query = `
         SELECT 
            Usuario.id_usuario, 
            Usuario.nome_usuario, 
            Usuario.matricula_usuario, 
            Usuario.email_usuario, 
            Usuario.senha_usuario,
            Loja.numero_loja, 
            Perfil.nome_perfil
        FROM postgres."oferte-ganhe".Usuario
        JOIN postgres."oferte-ganhe".Loja ON Usuario.id_loja = Loja.id_loja
        JOIN postgres."oferte-ganhe".Perfil ON Usuario.id_perfil = Perfil.id_perfil
        WHERE Usuario.matricula_usuario = $1::varchar;
    `;

    const values = [matricula];

    try {
        const result = await pool.query(query, values);
        return result.rows[0]; // Retorna o usuário encontrado
    } catch (err) {
        console.error('Erro ao buscar usuário por matrícula:', err);
        throw err;
    }
}

//Função para editar um usuário
async function editUser(nome, novaMatricula, email, senha, loja, perfil, matricula) {
    const query = `
        UPDATE postgres."oferte-ganhe".Usuario
        SET nome_usuario = $1, matricula_usuario = $2, email_usuario = $3, senha_usuario = $4,
            id_loja = (SELECT id_loja FROM postgres."oferte-ganhe".Loja WHERE numero_loja = $5),
            id_perfil = (SELECT id_perfil FROM postgres."oferte-ganhe".Perfil WHERE nome_perfil = $6)
        WHERE matricula_usuario = $7::varchar
        RETURNING *;
    `;

    const values = [nome, novaMatricula, email, senha, loja, perfil, matricula];

    try {
        const result = await pool.query(query, values);
        return result.rows[0]; // Retorna o usuário atualizado
    }catch(err){
        console.error('Erro ao editar usuário:', err);
        throw err;
    }
}

//Função para excluir um usuário
async function removeUser(matricula) {
    const query = `
        DELETE FROM postgres."oferte-ganhe".Usuario
        WHERE matricula_usuario = $1::varchar
        RETURNING *;
    `;

    try{
        const result = await pool.query(query, [matricula]);
        return result.rows[0]; // Retorna o usuário excluído, ou undefined se não encontrado
    }catch (err){
        console.error('Erro ao deletar usuário:', err);
        throw err;
    }
}

module.exports = { insertUser, searchUser, searchUserMatricula, editUser, removeUser };
