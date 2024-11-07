const pool = require('../config/database');

// Função para inserir um novo Estoque
async function insertStock(quantidade_minima, quantidade_recomendada, quantidade_atual, loja) {
    const query = `
        INSERT INTO postgres."oferte-ganhe".Estoque (quantidade_minima, quantidade_recomendada, quantidade_atual, id_loja)
        VALUES ($1, $2, $3, 
            (SELECT id_loja FROM postgres."oferte-ganhe".Loja WHERE numero_loja = $4)
        )
        RETURNING *;
    `;

    const values = [quantidade_minima, quantidade_recomendada, quantidade_atual, loja];

    try {
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (err) {
        console.error('Erro ao inserir usuário:', err);
        throw err;
    }
}

//Função para consultar todos os Estoques
async function searchStock() {
    const query =`
        SELECT 
            Estoque.id_estoque, 
            Estoque.quantidade_minima, 
            Estoque.quantidade_recomendada, 
            Estoque.quantidade_atual, 
            Loja.numero_loja
        FROM postgres."oferte-ganhe".Estoque
        JOIN postgres."oferte-ganhe".Loja ON Estoque.id_loja = Loja.id_loja
    `;

    try{
        const result = await pool.query(query);
        return result.rows;
    }catch(err){
        console.error('Erro ao consultar Estoque:', err);
    }
}

//Função para buscar estoque por loja
async function searchStockByStore(loja) {
    const query = `
        SELECT 
            Estoque.id_estoque, 
            Estoque.quantidade_minima, 
            Estoque.quantidade_recomendada, 
            Estoque.quantidade_atual, 
            Loja.numero_loja
        FROM postgres."oferte-ganhe".Estoque
        JOIN postgres."oferte-ganhe".Loja ON Estoque.id_loja = Loja.id_loja
        WHERE Loja.numero_loja = $1::varchar;
    `;

    const values = [loja];

    try {
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (err) {
        console.error('Erro ao buscar Estoque por Loja:', err);
        throw err;
    }
}

//Função para editar um estoque
async function editStock(quantidade_minima, quantidade_recomendada, quantidade_atual, loja) {
    const query = `
        UPDATE postgres."oferte-ganhe".Estoque
        SET quantidade_minima = $1, quantidade_recomendada = $2, quantidade_atual = $3
        WHERE id_loja = (SELECT id_loja FROM postgres."oferte-ganhe".Loja WHERE numero_loja = $4::varchar)
        RETURNING *;
    `;

    const values = [quantidade_minima, quantidade_recomendada, quantidade_atual, loja];

    try {
        const result = await pool.query(query, values);
        return result.rows[0];
    }catch(err){
        console.error('Erro ao editar Estoque:', err);
        throw err;
    }
}

//Função para excluir um Estoque
async function removeStock(loja) {
    const query = `
        DELETE FROM postgres."oferte-ganhe".Estoque
        WHERE id_loja = (SELECT id_loja FROM postgres."oferte-ganhe".Loja WHERE numero_loja = $1::varchar)
        RETURNING *;
    `;

    try{
        const result = await pool.query(query, [loja]);
        return result.rows[0]; 
    }catch (err){
        console.error('Erro ao deletar Estoque:', err);
        throw err;
    }
}

module.exports = { insertStock, searchStock, searchStockByStore, editStock, removeStock };
