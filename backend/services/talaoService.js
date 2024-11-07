const pool = require('../config/database');

// Função para inserir um novo Talão
async function insertTalao(remessa, quantidade, status, Estoque) {
    const query = `
        INSERT INTO postgres."oferte-ganhe".Talao (remessa, quantidade_talao, status_talao, id_Estoque)
        VALUES ($1, $2, $3, 
            (SELECT id_Estoque FROM postgres."oferte-ganhe".Estoque WHERE id_loja = $4)
        )
        RETURNING *;
    `;

    const values = [remessa, quantidade, status, Estoque];

    try {
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (err) {
        console.error('Erro ao inserir usuário:', err);
        throw err;
    }
}

//Função para consultar todos os Talões
async function searchTalao() {
    const query =`
        SELECT 
            Talao.remessa, 
            Talao.quantidade_talao, 
            Talao.status_talao,  
            Loja.numero_loja
        FROM postgres."oferte-ganhe".Talao
        JOIN postgres."oferte-ganhe".Estoque ON Talao.id_estoque = Estoque.id_estoque
        JOIN postgres."oferte-ganhe".Loja ON Estoque.id_loja = Loja.id_loja;
    `;

    try{
        const result = await pool.query(query);
        return result.rows;
    }catch(err){
        console.error('Erro ao consultar Talao:', err);
    }
}

//Função para buscar Talao por loja
async function searchTalaoByStore(loja) {
    const query = `
        SELECT 
            Talao.remessa, 
            Talao.quantidade_talao, 
            Talao.status_talao,  
            Loja.numero_loja
        FROM postgres."oferte-ganhe".Talao
        JOIN postgres."oferte-ganhe".Estoque ON Talao.id_estoque = Estoque.id_estoque
        JOIN postgres."oferte-ganhe".Loja ON Estoque.id_loja = Loja.id_loja
        WHERE Loja.numero_loja = $1::varchar;
    `;

    const values = [loja];

    try {
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (err) {
        console.error('Erro ao buscar Talao por Loja:', err);
        throw err;
    }
}

//Função para editar um Talao
async function editTalao(remessa, quantidade, status, loja) {
    const query = `
        UPDATE postgres."oferte-ganhe".Talao
        SET remessa = $1, quantidade_talao = $2, status_talao = $3
        WHERE id_estoque = (
            SELECT id_estoque FROM postgres."oferte-ganhe".Estoque 
            WHERE id_loja = (SELECT id_loja FROM postgres."oferte-ganhe".Loja WHERE numero_loja = $4::varchar)
        )
        RETURNING *;
    `;

    const values = [remessa, quantidade, status, loja];

    try {
        const result = await pool.query(query, values);
        return result.rows[0];
    }catch(err){
        console.error('Erro ao editar Talao:', err);
        throw err;
    }
}

//Função para excluir um Talao
async function removeTalao(loja) {
    const query = `
        DELETE FROM postgres."oferte-ganhe".Talao
        WHERE id_estoque = (
            SELECT id_estoque 
            FROM postgres."oferte-ganhe".Estoque 
            WHERE id_loja = (SELECT id_loja FROM postgres."oferte-ganhe".Loja WHERE numero_loja = $1::varchar)
        )
        RETURNING *;
    `;

    try{
        const result = await pool.query(query, [loja]);
        return result.rows[0]; 
    }catch (err){
        console.error('Erro ao deletar Talao:', err);
        throw err;
    }
}

module.exports = { insertTalao, searchTalao, searchTalaoByStore, editTalao, removeTalao };
