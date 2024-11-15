const pool = require('../config/database');

// Function to insert a new Talon
async function insertTalao(store, date_send, user_send, date_received, user_received, quantity, status) {
    const query = `
        INSERT INTO postgres."oferte-ganhe".Talon (
            id_store,
            date_send, 
            user_send, 
            date_received, 
            user_received, 
            quantity_talon,
            status_talon
        )
        VALUES (
            (SELECT id_store FROM postgres."oferte-ganhe".Store WHERE id_store = $1),
            $2, $3, $4, $5, $6, $7
        )
        RETURNING *;
    `;

    const values = [store, date_send, user_send, date_received, user_received, quantity, status];

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
