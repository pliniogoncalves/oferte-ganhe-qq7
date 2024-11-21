const pool = require('../config/database');

// Function to insert a new user
async function insertUser(name, registration, email, password, profile = '1', store = '1') {
    const query = `
        INSERT INTO Users (name_users, registration_users, email_users, password_users, id_profile, id_store)
        VALUES ($1, $2, $3, $4, 
            COALESCE((SELECT id_profile FROM postgres."oferte-ganhe".Profile WHERE name_profile = $5), 1), 
            COALESCE((SELECT id_store FROM postgres."oferte-ganhe".Store WHERE number_store = $6), 1)
        )
        RETURNING *;
    `;

    const values = [name, registration, email, password, profile || '1', store || '1'];

    try {
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (err) {
        console.error('Error inserting user:', err);
        throw err;
    }
}


//Function to query all users
async function searchUser() {
    const query =`
        SELECT 
            Users.id_users, 
            Users.name_users, 
            Users.registration_users, 
            Users.email_users, 
            Users.password_users,
            Profile.name_profile,
            Store.number_store 
        FROM postgres."oferte-ganhe".Users
        JOIN postgres."oferte-ganhe".Profile ON Users.id_profile = Profile.id_profile
        JOIN postgres."oferte-ganhe".Store ON Users.id_store = Store.id_store
    `;

    try{
        const result = await pool.query(query);
        return result.rows;
    }catch(err){
        console.error('Error querying user:', err);
    }
}

//Function to search for user by registration number
async function searchUserRegistration(registration) {
    const query = `
         SELECT 
            Users.id_users, 
            Users.name_users, 
            Users.registration_users, 
            Users.email_users, 
            Users.password_users,
            Perfil.name_profile,
            Store.number_store 
        FROM postgres."oferte-ganhe".Users
        JOIN postgres."oferte-ganhe".Profile ON Users.id_profile = Profile.id_profile
        JOIN postgres."oferte-ganhe".Store ON Users.id_store = Store.id_store
        WHERE Users.registration_users = $1::varchar;
    `;

    const values = [registration];

    try{
        const result = await pool.query(query, values);
        return result.rows[0];
    }catch(err) {
        console.error('Error searching for user by registration number:', err);
        throw err;
    }
}

//Function to edit a user
async function editUser(name, newRegistration, email, password, profile, store, registration) {
    const query = `
        UPDATE postgres."oferte-ganhe".Users
            SET name_users = $1, 
            registration_users = $2, 
            email_users = $3, 
            password_users = $4,
            id_profile = COALESCE(
                (SELECT id_profile FROM postgres."oferte-ganhe".Profile WHERE name_profile = $5 LIMIT 1), 1),
            id_store = COALESCE(
                (SELECT id_store FROM postgres."oferte-ganhe".Store WHERE number_store = $6 LIMIT 1), 1)
            WHERE registration_users = $7::varchar
            RETURNING *;
    `;

    const values = [name, newRegistration, email, password, profile, store, registration];

    try{
        const result = await pool.query(query, values);
        return result.rows[0];
    }catch(err){
        console.error('Error editing user:', err);
        throw err;
    }
}

//Function to delete a user
async function removeUser(registration) {
    const query = `
        DELETE FROM postgres."oferte-ganhe".Users
        WHERE registration_users = $1::varchar
        RETURNING *;
    `;

    try{
        const result = await pool.query(query, [registration]);
        return result.rows[0];
    }catch (err){
        console.error('Error deleting user:', err);
        throw err;
    }
}

module.exports = { 
    insertUser, 
    searchUser, 
    searchUserRegistration, 
    editUser, 
    removeUser };
