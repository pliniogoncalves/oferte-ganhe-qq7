const pool = require('../config/database');

//Function to insert a new Permission
async function insertPermission(name) {
    const query = `
        INSERT INTO postgres."oferte-ganhe".Permission (name_permission) 
        VALUES ($1)
        RETURNING *;
    `;

    const values = [name];

    try{
        const result = await pool.query(query, values);
        return result.rows[0];
    }catch(err){
        console.error('Error inserting Permission:', err);
        throw err;
    }
}

//Function to query all Permissions
async function searchPermission() {
    const query =`
        SELECT * FROM postgres."oferte-ganhe".Permission;
    `;

    try{
        const result = await pool.query(query);
        return result.rows;
    }catch(err){
        console.error('Error when querying Permission:', err);
    }
}

//Function to search Permission by name
async function searchPermissionName(name) {
    const query = `
        SELECT Permission.id_permission, Permission.name_permission 
        FROM postgres."oferte-ganhe".Permission
        WHERE Permission.name_permission = $1::varchar;
    `;

    const values = [name];

    try {
        const result = await pool.query(query, values);
        return result.rows[0]; 
    } catch (err) {
        console.error('Error searching for Permission by name:', err);
        throw err;
    }
}

//Function to edit a Permission
async function editPermission(newName, name) {
    const query = `
        UPDATE postgres."oferte-ganhe".Permission
        SET name_permission = $1
        WHERE name_permission = $2::varchar
        RETURNING *;
    `;

    const values = [newName, name];

    try {
        const result = await pool.query(query, values);
        return result.rows[0];
    }catch(err){
        console.error('Error editing Permission:', err);
        throw err;
    }
}

//Function to delete a Permission
async function removePermission(name) {
    const query = `
        DELETE FROM postgres."oferte-ganhe".Permission
        WHERE name_permission = $1::varchar
        RETURNING *;
    `;

    try{
        const result = await pool.query(query, [name]);
        return result.rows[0];
    }catch (err){
        console.error('Error deleting Permission:', err);
        throw err;
    }
}

module.exports = { 
    insertPermission, 
    searchPermission, 
    searchPermissionName, 
    editPermission, 
    removePermission 
};

