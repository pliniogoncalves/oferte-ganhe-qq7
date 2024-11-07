const pool = require('../config/database');

// Função para inserir um novo recebimento
async function insertReceiving(data, quantidade, usuario, talao, loja) {
    const query = `
        INSERT INTO postgres."oferte-ganhe".recebimento (data_recebimento, quantidade_recebido, id_usuario, id_talao, id_loja)
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
        console.error('Erro ao inserir Recebimento:', err);
        throw err;
    }
}

//Função para consultar todos os Recebimentos
async function searchReceiving() {
    const query =`
        SELECT 
            Recebimento.data_Recebimento, 
            Recebimento.quantidade_Recebido, 
            Usuario.nome_usuario, 
            Talao.remessa, 
            Loja.numero_loja
        FROM postgres."oferte-ganhe".Recebimento
        JOIN postgres."oferte-ganhe".Usuario ON Recebimento.id_usuario = Usuario.id_usuario
        JOIN postgres."oferte-ganhe".Talao ON Recebimento.id_talao = Talao.id_talao
        JOIN postgres."oferte-ganhe".Loja ON Recebimento.id_loja = Loja.id_loja;
    `;

    try{
        const result = await pool.query(query);
        return result.rows;
    }catch(err){
        console.error('Erro ao consultar Recebimento:', err);
    }
}

//Função para buscar Recebimento por remessa do Talao
async function searchReceivingByTalao(talao) {
    const query = `
        SELECT 
            Recebimento.data_Recebimento, 
            Recebimento.quantidade_Recebido, 
            Usuario.nome_usuario, 
            Talao.remessa, 
            Loja.numero_loja
        FROM postgres."oferte-ganhe".Recebimento
        JOIN postgres."oferte-ganhe".Usuario ON Recebimento.id_usuario = Usuario.id_usuario
        JOIN postgres."oferte-ganhe".Talao ON Recebimento.id_talao = Talao.id_talao
        JOIN postgres."oferte-ganhe".Loja ON Recebimento.id_loja = Loja.id_loja
        WHERE Talao.remessa = $1::varchar;
    `;

    const values = [talao];

    try {
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (err) {
        console.error('Erro ao buscar Recebimento por remessa do talao:', err);
        throw err;
    }
}

//Função para editar um Recebimento
async function editReceiving(data, talao) {
    const query = `
        UPDATE postgres."oferte-ganhe".Recebimento
        SET data_Recebimento = $1
        WHERE id_talao = (SELECT id_talao FROM postgres."oferte-ganhe".Talao WHERE remessa = $2::varchar)
        RETURNING *;
    `;

    const values = [data, talao];

    try {
        const result = await pool.query(query, values);
        return result.rows[0];
    }catch(err){
        console.error('Erro ao editar Recebimento:', err);
        throw err;
    }
}

//Função para excluir um Recebimento
async function removeReceiving(talao) {
    const query = `
        DELETE FROM postgres."oferte-ganhe".Recebimento
        WHERE id_talao = (SELECT id_talao FROM postgres."oferte-ganhe".Talao WHERE remessa = $1::varchar)
        RETURNING *;
    `;

    try{
        const result = await pool.query(query, [talao]);
        return result.rows[0];
    }catch (err){
        console.error('Erro ao deletar Recebimento:', err);
        throw err;
    }
}

module.exports = { insertReceiving, searchReceiving, searchReceivingByTalao, editReceiving, removeReceiving };