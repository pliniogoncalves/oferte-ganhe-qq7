const authService = require('../services/authService');
const User = require('../models/User');

async function login(req, res) {
    const { registration, password } = req.body;

    try{
        const user = await User.findOne({ where: { registration_users: registration }, include: ['profile'] });

        if(!user){
            return res.status(404).render('login',{errorMessage: 'Usuario não encontrado.' });
        }

        // Check password
        const isPasswordValid = await authService.verifyPassword(password, user.password_users);

        if(!isPasswordValid){
            return res.status(401).render('login',{ errorMessage: 'Credenciais Inválidas' });
        }

        // Generate the JWT token
        const token = await authService.generateToken(user);

        // Set token in a cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: (parseInt(process.env.JWT_COOKIE_EXPIRES_HOURS) || 1) * 60 * 60 * 1000

        });

         // Redirect to home page after successful login
         res.redirect('/main');
         
    }catch(err){
        console.error('Login error:', err);
        res.status(500).render('login',{errorMessage: 'Erro interno do servidor.', error: err.message });
    }
}

async function logout(req, res) {
    try{
        // Clear the token cookie
        res.clearCookie('token');
        // Redirect to login page after logout
        res.redirect('/login');
    }catch(err){
        console.error('Error during logout:', err);
        res.status(500).render('login',{errorMessage: 'Erro durante o logout.', error: err.message });
    }
}

module.exports = { login, logout };