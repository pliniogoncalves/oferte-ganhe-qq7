const authService = require('../services/authService');
const User = require('../models/User');
const ProfilePermission = require('../services/profilePermissionService');

async function login(req, res) {
    const { email, password } = req.body;

    try{
        const user = await User.findOne({ where: { email_users: email }, include: ['profile'] });

        if(!user){
            return res.status(404).json({ message: 'User not found.' });
        }

        // Check password
        const isPasswordValid = await authService.verifyPassword(password, user.password_users);

        if(!isPasswordValid){
            return res.status(401).json({ message: 'Invalid credentials.' });
        }

        // Fetch the permissions for the user's profile
        const permissions = await ProfilePermission.searchPermissionsByProfile(user.id_profile);

        // Generate the JWT token
        const token = authService.generateToken(user, permissions.map(p => p.name_permission));

        // Set token in a cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: (parseInt(process.env.JWT_COOKIE_EXPIRES_HOURS) || 1) * 60 * 60 * 1000

        });

        res.status(200).json({ message: 'Login successful.' });
    }catch(err){
        console.error('Login error:', err);
        res.status(500).json({ message: 'Internal server error.', error: err.message });
    }
}

async function logout(req, res) {
    try{
        // Clear the token cookie
        res.clearCookie('token');
        res.status(200).json({ message: 'Logout successful.' });
    }catch(err){
        console.error('Error during logout:', err);
        res.status(500).json({ message: 'Error during logout.', error: err.message });
    }
}

module.exports = { login, logout };
