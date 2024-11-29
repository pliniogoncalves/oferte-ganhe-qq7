const authService = require('../services/authService');
const User = require('../models/User');

async function login(req, res) {
    const { registration, password } = req.body;

    try{
        const user = await User.findOne({ where: { registration_users: registration }, include: ['profile'] });

        if(!user){
            const message = 'Usuário não encontrado.';

            if(req.headers['accept'] === 'application/json') {
                return res.status(404).json({ message });
            }

            req.addMessage(message);
            return res.redirect('/login');
        }

        const isPasswordValid = await authService.verifyPassword(password, user.password_users);

        if(!isPasswordValid){
            const message = 'Credenciais inválidas.';

            if(req.headers['accept'] === 'application/json'){
                return res.status(401).json({ message });
            }

            req.addMessage(message);
            return res.redirect('/login');
        }

        const token = await authService.generateToken(user);

        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: (parseInt(process.env.JWT_COOKIE_EXPIRES_HOURS) || 1) * 60 * 60 * 1000
        });
        
        if(req.headers['accept'] === 'application/json'){
            return res.status(200).json({ message: 'Login bem-sucedido.', token });
        }

        res.redirect('/main');
    }catch(err){
        console.error('Login error:', err);
        const message = 'Erro interno do servidor.';

        if(req.headers['accept'] === 'application/json'){
            return res.status(500).json({ message, error: err.message });
        }

        req.addMessage(message);
        res.status(500).redirect('/login');
    }
}

async function logout(req, res) {
    try{
        res.clearCookie('token');

        const message = 'Você saiu com sucesso.';

        if(req.headers['accept'] === 'application/json'){
            return res.status(200).json({ message });
        }

        req.addMessage(message);
        res.redirect('/login');

    }catch(err){
        console.error('Error during logout:', err);
        const message = 'Erro durante o logout.';

        if(req.headers['accept'] === 'application/json'){
            return res.status(500).json({ message, error: err.message });
        }

        req.addMessage(message);
        res.status(500).redirect('/login');
    }
}

module.exports = { login, logout };
