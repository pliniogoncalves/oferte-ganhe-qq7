const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { searchPermissionsByProfile } = require('../services/profilePermissionService');
const Profile = require('../models/Profile');

// Function to generate a JWT token with dynamic payload and expiration time
async function generateToken(payload, expiresIn = process.env.JWT_EXPIRES_IN || '1h') {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
}

// Function to generate an access token for authentication
async function generateAuthToken(user) {
    const userProfile = await Profile.findOne({ where: { id_profile: user.id_profile } });
    if(!userProfile){
        throw new Error(`Profile with ID '${user.id_profile}' not found`);
    }

    const permissions = await searchPermissionsByProfile(userProfile.name_profile);

    const payload = { 
        id: user.id_users, 
        registration: user.registration_users,
        id_profile: user.id_profile,
        permissions: permissions.map(permission => permission.name_permission)
    };
    
    return generateToken(payload);
}

// Function for password hashing
async function hashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
}

// Function to check a password
async function verifyPassword(inputPassword, storedPassword) {
    return bcrypt.compare(inputPassword, storedPassword);
}

// Function to validate a JWT token (e.g., for password reset)
function validateToken(token) {
    try{
        return jwt.verify(token, process.env.JWT_SECRET);
    }catch(err){
        console.error('Token inválido ou expirado:', err);
        throw new Error('Invalid or expired token');
    }
}

module.exports = { 
    generateToken, 
    generateAuthToken, 
    hashPassword, 
    verifyPassword, 
    validateToken 
};
