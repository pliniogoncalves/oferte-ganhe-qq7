const pool = require('../config/database');

// Função para inserir um nova Loja
async function insertStore(nome, numero) {
    const query = `
        INSERT INTO postgres."oferte-ganhe".Loja (nome_loja, numero_loja)
        VALUES ($1, $2)
        RETURNING *;
    `;

    const values = [nome, numero];

    try {
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (err) {
        console.error('Erro ao inserir loja:', err);
        throw err;
    }
}

//Função para consultar todas as lojas
async function searchStore() {
    const query =`
        SELECT * FROM postgres."oferte-ganhe".Loja;
    `;

    try{
        const result = await pool.query(query);
        return result.rows;
    }catch(err){
        console.error('Erro ao consultar Loja:', err);
    }
}

//Função para buscar loja por numero
async function searchStoreNumber(numero) {
    const query = `
         SELECT 
            Loja.nome_loja, 
            Loja.numero_loja 
        FROM postgres."oferte-ganhe".Loja
        WHERE Loja.numero_loja = $1::varchar;
    `;

    const values = [numero];

    try {
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (err) {
        console.error('Erro ao buscar loja por numero:', err);
        throw err;
    }
}

//Função para editar uma loja
async function editStore(nome, novoNumero, numero) {
    const query = `
        UPDATE postgres."oferte-ganhe".Loja
        SET nome_loja = $1, numero_loja = $2
        WHERE numero_loja = $3::varchar
        RETURNING *;
    `;

    const values = [nome, novoNumero, numero];

    try {
        const result = await pool.query(query, values);
        return result.rows[0];
    }catch(err){
        console.error('Erro ao editar loja:', err);
        throw err;
    }
}

//Função para excluir uma loja
async function removeStore(numero) {
    const query = `
        DELETE FROM postgres."oferte-ganhe".Loja
        WHERE numero_loja = $1::varchar
        RETURNING *;
    `;

    try{
        const result = await pool.query(query, [numero]);
        return result.rows[0];
    }catch (err){
        console.error('Erro ao deletar loja:', err);
        throw err;
    }
}


module.exports = { insertStore, searchStore, searchStoreNumber, editStore, removeStore };
