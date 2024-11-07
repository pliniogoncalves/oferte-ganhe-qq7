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
        console.error('Erro ao inserir Modulo:', err);
        throw err;
    }
}

//Função para consultar todos os modulos
async function searchModule() {
    const query =`
        SELECT * FROM postgres."oferte-ganhe".Modulo;
    `;

    try{
        const result = await pool.query(query);
        return result.rows;
    }catch(err){
        console.error('Erro ao consultar Modulo:', err);
    }
}

//Função para buscar modulo por nome
async function searchModuleName(nome) {
    const query = `
         SELECT 
            Modulo.nome_modulo,
            Modulo.acesso, 
            Modulo.funcionalidade 
        FROM postgres."oferte-ganhe".Modulo
        WHERE Modulo.nome_modulo = $1::varchar;
    `;

    const values = [nome];

    try {
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (err) {
        console.error('Erro ao buscar Modulo por nome:', err);
        throw err;
    }
}

//Função para editar um modulo
async function editModule(novoNome, acesso, funcionalidade, nome) {
    const query = `
        UPDATE postgres."oferte-ganhe".Modulo
        SET nome_Modulo = $1, acesso = $2, funcionalidade = $3
        WHERE nome_modulo = $4::varchar
        RETURNING *;
    `;

    const values = [novoNome, acesso, funcionalidade, nome];

    try {
        const result = await pool.query(query, values);
        return result.rows[0];
    }catch(err){
        console.error('Erro ao editar Modulo:', err);
        throw err;
    }
}

//Função para excluir um modulo
async function removeModule(nome) {
    const query = `
        DELETE FROM postgres."oferte-ganhe".Modulo
        WHERE nome_modulo = $1::varchar
        RETURNING *;
    `;

    try{
        const result = await pool.query(query, [nome]);
        return result.rows[0];
    }catch (err){
        console.error('Erro ao deletar Modulo:', err);
        throw err;
    }
}


module.exports = { insertModule, searchModule, searchModuleName, editModule, removeModule };
