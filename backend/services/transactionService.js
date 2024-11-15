const pool = require('../config/database');

//Function to insert a new transaction
async function insertTransaction(talonId, transactionType, transactionDate, userId, talonQuantity) {
    const query = `
        INSERT INTO postgres."oferte-ganhe".Transaction 
            (id_talon, type_transaction, date_transaction, user_transaction, quantity_talon_transaction)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
    `;
    const values = [talonId, transactionType, transactionDate, userId, talonQuantity];
    
    try {
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (err) {
        console.error('Error inserting transaction:', err);
        throw err;
    }
}

//Function to fetch all transactions
async function searchTransactions() {
    const query = `SELECT * FROM postgres."oferte-ganhe".Transaction;`;
    
    try {
        const result = await pool.query(query);
        return result.rows;
    } catch (err) {
        console.error('Error fetching transactions:', err);
        throw err;
    }
}

//Function to search for transaction by ID
async function searchTransactionId(transactionId) {
    const query = `SELECT * FROM postgres."oferte-ganhe".Transaction WHERE id_transaction = $1;`;
    
    try {
        const result = await pool.query(query, [transactionId]);
        return result.rows[0];
    } catch (err) {
        console.error('Error fetching transaction by ID:', err);
        throw err;
    }
}

//Function to update a transaction
async function editTransaction(transactionId, transactionType, transactionDate, userId, talonQuantity) {
    const query = `
        UPDATE postgres."oferte-ganhe".Transaction
        SET type_transaction = $1, date_transaction = $2, user_transaction = $3, quantity_talon_transaction = $4
        WHERE id_transaction = $5
        RETURNING *;
    `;
    const values = [transactionType, transactionDate, userId, talonQuantity, transactionId];
    
    try {
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (err) {
        console.error('Error updating transaction:', err);
        throw err;
    }
}

//Function to delete a transaction
async function removeTransaction(transactionId) {
    const query = `DELETE FROM postgres."oferte-ganhe".Transaction WHERE id_transaction = $1 RETURNING *;`;
    
    try {
        const result = await pool.query(query, [transactionId]);
        return result.rows[0];
    } catch (err) {
        console.error('Error deleting transaction:', err);
        throw err;
    }
}

module.exports = { 
    insertTransaction, 
    searchTransactions, 
    searchTransactionId, 
    editTransaction, 
    removeTransaction 
};
