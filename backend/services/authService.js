const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { searchPermissionsByProfile } = require('../services/profilePermissionService');
const Profile = require('../models/Profile');

//Function to generate a JWT token
async function generateToken(user) {

    //Fetch the profile name from the user and then fetch permissions
    const userProfile = await Profile.findOne({ where: { id_profile: user.id_profile } });
    if(!userProfile){
        throw new Error(`Profile with ID '${user.id_profile}' not found`);
    }
    
    //Fetch permissions associated with the user profile
    const permissions = await searchPermissionsByProfile(userProfile.name_profile);

    const payload = { 
        id: user.id_users, 
        registration: user.registration_users,
        id_profile: user.id_profile,
        permissions: permissions.map(permission => permission.name_permission)
    };
    return jwt.sign(payload, process.env.JWT_SECRET, { 
        expiresIn: process.env.JWT_EXPIRES_IN || '1h',
    });
}

//Function for password hashing
async function hashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
}

//Function to check a password
async function verifyPassword(inputPassword, storedPassword) {
    return bcrypt.compare(inputPassword, storedPassword);
}

module.exports = { generateToken, hashPassword, verifyPassword };
