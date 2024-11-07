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
        console.error('Erro ao inserir Envio:', err);
        throw err;
    }
}

//Função para consultar todos os envios
async function searchSending() {
    const query =`
        SELECT 
            Envio.data_envio, 
            Envio.quantidade_envio, 
            Usuario.nome_usuario, 
            Talao.remessa, 
            Loja.numero_loja
        FROM postgres."oferte-ganhe".Envio
        JOIN postgres."oferte-ganhe".Usuario ON Envio.id_usuario = Usuario.id_usuario
        JOIN postgres."oferte-ganhe".Talao ON Envio.id_talao = Talao.id_talao
        JOIN postgres."oferte-ganhe".Loja ON Envio.id_loja = Loja.id_loja;
    `;

    try{
        const result = await pool.query(query);
        return result.rows;
    }catch(err){
        console.error('Erro ao consultar Envio:', err);
    }
}

//Função para buscar Envio por remessa do Talao
async function searchSendingByTalao(talao) {
    const query = `
        SELECT 
            Envio.data_envio, 
            Envio.quantidade_envio, 
            Usuario.nome_usuario, 
            Talao.remessa, 
            Loja.numero_loja
        FROM postgres."oferte-ganhe".Envio
        JOIN postgres."oferte-ganhe".Usuario ON Envio.id_usuario = Usuario.id_usuario
        JOIN postgres."oferte-ganhe".Talao ON Envio.id_talao = Talao.id_talao
        JOIN postgres."oferte-ganhe".Loja ON Envio.id_loja = Loja.id_loja
        WHERE Talao.remessa = $1::varchar;
    `;

    const values = [talao];

    try {
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (err) {
        console.error('Erro ao buscar envio por remessa do talao:', err);
        throw err;
    }
}

//Função para editar um Envio
async function editSending(data, talao) {
    const query = `
        UPDATE postgres."oferte-ganhe".Envio
        SET data_envio = $1
        WHERE id_talao = (SELECT id_talao FROM postgres."oferte-ganhe".Talao WHERE remessa = $2::varchar)
        RETURNING *;
    `;

    const values = [data, talao];

    try {
        const result = await pool.query(query, values);
        return result.rows[0];
    }catch(err){
        console.error('Erro ao editar Envio:', err);
        throw err;
    }
}

//Função para excluir um Envio
async function removeSending(talao) {
    const query = `
        DELETE FROM postgres."oferte-ganhe".Envio
        WHERE id_talao = (SELECT id_talao FROM postgres."oferte-ganhe".Talao WHERE remessa = $1::varchar)
        RETURNING *;
    `;

    try{
        const result = await pool.query(query, [talao]);
        return result.rows[0];
    }catch (err){
        console.error('Erro ao deletar Envio:', err);
        throw err;
    }
}

module.exports = { insertSending, searchSending, searchSendingByTalao, editSending, removeSending };
