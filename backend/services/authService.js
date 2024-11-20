const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Function to generate a JWT token
function generateToken(user) {
    const payload = { id: user.id_users, email: user.email_users };
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
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

module.exports = { generateToken, hashPassword, verifyPassword };
