const pool = require('../config/database');

//Function to insert a new stock
async function insertStock(storeId, talonId, currentStock, minStock, recommendedStock, stockStatus) {
    const query = `
        INSERT INTO postgres."oferte-ganhe".Stock 
            (id_store, id_talon, current_stock, minimum_stock, recommended_stock, status_stock)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *;
    `;
    const values = [storeId, talonId, currentStock, minStock, recommendedStock, stockStatus];
    
    try {
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (err) {
        console.error('Error inserting stock:', err);
        throw err;
    }
}

// Function to search for all stock
async function searchStocks() {
    const query = `SELECT * FROM postgres."oferte-ganhe".Stock;`;
    
    try {
        const result = await pool.query(query);
        return result.rows;
    } catch (err) {
        console.error('Error fetching stocks:', err);
        throw err;
    }
}

//Function to search for a stock by ID
async function searchStockById(stockId) {
    const query = `SELECT * FROM postgres."oferte-ganhe".Stock WHERE id_stock = $1;`;
    
    try {
        const result = await pool.query(query, [stockId]);
        return result.rows[0];
    } catch (err) {
        console.error('Error fetching stock by ID:', err);
        throw err;
    }
}

//Function to update a stock
async function editStock(stockId, storeId, talonId, currentStock, minStock, recommendedStock, stockStatus) {
    const query = `
        UPDATE postgres."oferte-ganhe".Stock
        SET id_store = $1, id_talon = $2, current_stock = $3, minimum_stock = $4, 
            recommended_stock = $5, status_stock = $6
        WHERE id_stock = $7
        RETURNING *;
    `;
    const values = [storeId, talonId, currentStock, minStock, recommendedStock, stockStatus, stockId];
    
    try {
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (err) {
        console.error('Error updating stock:', err);
        throw err;
    }
}

// Function to delete a stock
async function removeStock(stockId) {
    const query = `DELETE FROM postgres."oferte-ganhe".Stock WHERE id_stock = $1 RETURNING *;`;
    
    try {
        const result = await pool.query(query, [stockId]);
        return result.rows[0];
    } catch (err) {
        console.error('Error deleting stock:', err);
        throw err;
    }
}

module.exports = { 
    insertStock, 
    searchStocks, 
    searchStockById, 
    editStock, 
    removeStock 
};
