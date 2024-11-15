const pool = require('../config/database');

//Function to insert a new Talon
async function insertTalon(store = 1, dateSend, userSend, quantity, status = 'Enviado') {
    const query = `
        INSERT INTO postgres."oferte-ganhe".Talon (id_store, date_send, user_send, quantity_talon, status_talon)
        VALUES (
            COALESCE((SELECT id_store FROM postgres."oferte-ganhe".Store WHERE id_store = $1), 1),
            $2, $3, $4, $5
        )
        RETURNING *;
    `;
    const values = [store, dateSend, userSend, quantity, status];
    
    try {
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (err) {
        console.error('Error inserting talon:', err);
        throw err;
    }
}

// Function to search for all Talons
async function searchTalons() {
    const query = `SELECT * FROM postgres."oferte-ganhe".Talon;`;
    
    try {
        const result = await pool.query(query);
        return result.rows;
    } catch (err) {
        console.error('Error fetching talons:', err);
        throw err;
    }
}

//Function to search for Talon by ID
async function searchTalonById(talonId) {
    const query = `SELECT * FROM postgres."oferte-ganhe".Talon WHERE id_talon = $1;`;
    
    try {
        const result = await pool.query(query, [talonId]);
        return result.rows[0];
    } catch (err) {
        console.error('Error fetching talon by ID:', err);
        throw err;
    }
}

//Function to update a Talon
async function updateTalon(talonId, dateReceived, userReceived, status = 'Recebido') {
    const query = `
        UPDATE postgres."oferte-ganhe".Talon
        SET date_received = $1, user_received = $2, status_talon = $3
        WHERE id_talon = $4
        RETURNING *;
    `;
    const values = [dateReceived, userReceived, status, talonId];
    
    try {
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (err) {
        console.error('Error updating talon:', err);
        throw err;
    }
}

//Function to remove a stub
async function removeTalon(talonId) {
    const query = `DELETE FROM postgres."oferte-ganhe".Talon 
    WHERE id_talon = $1 
    RETURNING *;`;
    
    try {
        const result = await pool.query(query, [talonId]);
        return result.rows[0];
    } catch (err) {
        console.error('Error deleting talon:', err);
        throw err;
    }
}

module.exports = { 
    insertTalon, 
    searchTalons, 
    searchTalonById, 
    updateTalon, 
    removeTalon 
};
