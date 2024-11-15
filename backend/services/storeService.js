const pool = require('../config/database');

// Function to insert a new Store
async function insertStore(name, number) {
    const query = `
        INSERT INTO postgres."oferte-ganhe".Store (name_store, number_store)
        VALUES ($1, $2)
        RETURNING *;
    `;

    const values = [name, number];

    try{
        const result = await pool.query(query, values);
        return result.rows[0];
    }catch(err){
        console.error('Error inserting store:', err);
        throw err;
    }
}

//Function to query all stores
async function searchStore() {
    const query =`
        SELECT * FROM postgres."oferte-ganhe".Store;
    `;

    try{
        const result = await pool.query(query);
        return result.rows;
    }catch(err){
        console.error('Error when querying Store:', err);
    }
}

//Function to search for store by number
async function searchStoreNumber(number) {
    const query = `
         SELECT 
            Store.name_store, 
            Store.number_store 
        FROM postgres."oferte-ganhe".Store
        WHERE Store.number_store = $1::varchar;
    `;

    const values = [number];

    try{
        const result = await pool.query(query, values);
        return result.rows[0];
    }catch(err){
        console.error('Error searching for store by number:', err);
        throw err;
    }
}

//Function to edit a store
async function editStore(name, newNumber, number) {
    const query = `
        UPDATE postgres."oferte-ganhe".Store
        SET name_store = $1, number_store = $2
        WHERE number_store = $3::varchar
        RETURNING *;
    `;

    const values = [name, newNumber, number];

    try{
        const result = await pool.query(query, values);
        return result.rows[0];
    }catch(err){
        console.error('Error editing store:', err);
        throw err;
    }
}

//Function to delete a store
async function removeStore(number) {
    const query = `
        DELETE FROM postgres."oferte-ganhe".Store
        WHERE number_store = $1::varchar
        RETURNING *;
    `;

    try{
        const result = await pool.query(query, [number]);
        return result.rows[0];
    }catch(err){
        console.error('Error deleting store:', err);
        throw err;
    }
}

module.exports = { 
    insertStore, 
    searchStore, 
    searchStoreNumber, 
    editStore, 
    removeStore 
};
