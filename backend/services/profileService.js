const pool = require('../config/database');

//Function to insert a new Profile
async function insertProfile(name) {
    const query = `
        INSERT INTO postgres."oferte-ganhe".Profile (name_profile) 
        VALUES ($1)
        RETURNING *;
    `;

    const values = [name];

    try{
        const result = await pool.query(query, values);
        return result.rows[0];
    }catch(err){
        console.error('Error inserting profile:', err);
        throw err;
    }
}

//Function to query all Profiles
async function searchProfile() {
    const query =`
        SELECT * FROM postgres."oferte-ganhe".Profile;
    `;

    try{
        const result = await pool.query(query);
        return result.rows;
    }catch(err){
        console.error('Error when querying Profile:', err);
    }
}

//Function to search Profile by name
async function searchProfileName(name) {
    const query = `
        SELECT Profile.id_profile, profile.name_profile 
        FROM postgres."oferte-ganhe".Profile
        WHERE Profile.name_profile = $1::varchar;
    `;

    const values = [name];

    try {
        const result = await pool.query(query, values);
        return result.rows[0]; 
    } catch (err) {
        console.error('Error searching for Profile by name:', err);
        throw err;
    }
}

//Function to edit a Profile
async function editProfile(newName, name) {
    const query = `
        UPDATE postgres."oferte-ganhe".Profile
        SET name_profile = $1
        WHERE name_profile = $2::varchar
        RETURNING *;
    `;

    const values = [newName, name];

    try {
        const result = await pool.query(query, values);
        return result.rows[0];
    }catch(err){
        console.error('Error editing profile:', err);
        throw err;
    }
}

//Function to delete a profile
async function removeProfile(name) {
    const query = `
        DELETE FROM postgres."oferte-ganhe".Profile
        WHERE name_profile = $1::varchar
        RETURNING *;
    `;

    try{
        const result = await pool.query(query, [name]);
        return result.rows[0];
    }catch (err){
        console.error('Error deleting Profile:', err);
        throw err;
    }
}

module.exports = { 
    insertProfile, 
    searchProfile, 
    searchProfileName, 
    editProfile, 
    removeProfile 
};

