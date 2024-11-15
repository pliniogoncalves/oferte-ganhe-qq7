const pool = require('../config/database');

//Function to insert a new profile and permission association
async function insertProfilePermission(id_profile, id_permission) {
    const query = `
        INSERT INTO postgres."oferte-ganhe".Profile_Permission (id_profile, id_permission)
        VALUES ($1, $2)
        RETURNING *;
    `;
    
    const values = [id_profile, id_permission];

    try {
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (err) {
        console.error('Error inserting Profile Permission:', err);
        throw err;
    }
}


//Function to search for all permissions associated with a specific profile
async function getPermissionsByProfile(id_profile) {
    const query = `
        SELECT Permission.id_permission, Permission.name_permission
        FROM postgres."oferte-ganhe".Profile_Permission
        JOIN postgres."oferte-ganhe".Permission ON Profile_Permission.id_permission = Permission.id_permission
        WHERE Profile_Permission.id_profile = $1;
    `;

    try {
        const result = await pool.query(query, [id_profile]);
        return result.rows;
    } catch (err) {
        console.error('Error fetching permissions for profile:', err);
        throw err;
    }
}

//Function to search for all profiles and their associated permissions
async function getAllProfilesWithPermissions() {
    const query = `
        SELECT Profile.id_profile, Profile.name_profile, Permission.id_permission, Permission.name_permission
        FROM postgres."oferte-ganhe".Profile
        LEFT JOIN postgres."oferte-ganhe".Profile_Permission ON Profile.id_profile = Profile_Permission.id_profile
        LEFT JOIN postgres."oferte-ganhe".Permission ON Profile_Permission.id_permission = Permission.id_permission;
    `;

    try {
        const result = await pool.query(query);
        return result.rows;
    } catch (err) {
        console.error('Error fetching all profiles with permissions:', err);
        throw err;
    }
}

//Function to remove a specific permission from a profile
async function removePermissionFromProfile(id_profile, id_permission) {
    const query = `
        DELETE FROM postgres."oferte-ganhe".Profile_Permission
        WHERE id_profile = $1 AND id_permission = $2
        RETURNING *;
    `;

    const values = [id_profile, id_permission];

    try {
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (err) {
        console.error('Error removing permission from profile:', err);
        throw err;
    }
}

module.exports = {
    insertProfilePermission,
    getPermissionsByProfile,
    getAllProfilesWithPermissions,
    removePermissionFromProfile
};
