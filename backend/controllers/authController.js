const authService = require('../services/authService');
const pool = require('../config/database');

async function login(req, res) {
    const { email, password } = req.body;

    try {
        // Search for the user by email
        const query = `SELECT * FROM postgres."oferte-ganhe".Users WHERE email_users = $1;`;
        const result = await pool.query(query, [email]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'User not found.' });
        }

        const user = result.rows[0];

        // Check password
        const isPasswordValid = await authService.verifyPassword(password, user.password_users);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }

        // Generate the JWT token
        const token = authService.generateToken(user);

        res.status(200).json({ message: 'Login successful.', token });
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ message: 'Internal server error.', error: err.message });
    }
}

module.exports = { login };