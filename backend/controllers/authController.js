const authService = require('../services/authService');
const User = require('../models/User');

async function login(req, res) {
    const { registration, password } = req.body;

    try{
        const user = await User.findOne({ where: { registration_users: registration }, include: ['profile'] });

        if(!user){
            req.addMessage('Usuário não encontrado.');
            return res.status(404).redirect('/login');
        }

        // Check password
        const isPasswordValid = await authService.verifyPassword(password, user.password_users);

        if(!isPasswordValid){
            req.addMessage('Credenciais inválidas.');
            return res.status(401).redirect('/login');
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
        req.addMessage('Erro interno do servidor.');
        res.status(500).redirect('/login');
    }
}

async function logout(req, res) {
    try{
        // Clear the token cookie
        res.clearCookie('token');

        // Redirect to login page after logout
        req.addMessage('Você saiu com sucesso.');
        res.redirect('/login');
    }catch(err){
        console.error('Error during logout:', err);
        req.addMessage('Erro durante o logout.');
        res.status(500).redirect('/login');
    }
}

module.exports = { login, logout };