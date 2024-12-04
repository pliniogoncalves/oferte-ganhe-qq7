const authService = require('../services/authService');
const User = require('../models/User');
const nodemailer = require('nodemailer');

async function login(req, res) {
    const { registration, password } = req.body;

    try{
        const user = await User.findOne({ where: { registration_users: registration }, include: ['profile'] });

        if(!user){
            const message = 'Usuário não encontrado.';
            return handleResponse(req, res, 404, message, '/login');
        }

        const isPasswordValid = await authService.verifyPassword(password, user.password_users);

        if(!isPasswordValid){
            const message = 'Credenciais inválidas.';
            return handleResponse(req, res, 401, message, '/login');
        }

        const token = await authService.generateAuthToken(user);

        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: (parseInt(process.env.JWT_COOKIE_EXPIRES_HOURS) || 1) * 60 * 60 * 1000,
        });

        return handleResponse(req, res, 200, 'Login bem-sucedido.', '/main', { token });
    }catch(err){
        console.error('Login error:', err);
        return handleResponse(req, res, 500, 'Erro interno do servidor.', '/login', err);
    }
}

async function logout(req, res) {
    try {
        res.clearCookie('token');
        return handleResponse(req, res, 200, 'Você saiu com sucesso.', '/login');
    } catch (err) {
        console.error('Error during logout:', err);
        return handleResponse(req, res, 500, 'Erro durante o logout.', '/login', err);
    }
}

async function forgotPassword(req, res) {
    const { email } = req.body;

    try{
        const user = await User.findOne({ where: { email_users: email } });
        if(!user){
            const message = 'Usuário não encontrado.';
            return handleResponse(req, res, 404, message, '/login');
        }

        const resetToken = await authService.generateToken({ id: user.id_users }, '15m');
        const resetLink = `${process.env.FRONTEND_URL}/api/reset-password?token=${resetToken}`;

        const transporter = nodemailer.createTransport({
            host: process.env.MAILTRAP_HOST,
            port: process.env.MAILTRAP_PORT,
            auth: {
                user: process.env.MAILTRAP_USER,
                pass: process.env.MAILTRAP_PASS,
            },
        });

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Recuperação de Senha',
            html: `<p>Clique no link para redefinir sua senha: <a href="${resetLink}">Redefinir Senha</a></p>`,
        });

        const message = 'E-mail enviado com sucesso.';
        return handleResponse(req, res, 200, message, '/login');
    }catch(err){
        console.error('Erro ao enviar e-mail:', err);
        const message = 'Erro ao enviar e-mail.';
        res.status(500).json({ message: 'Erro ao enviar e-mail.', error: err.message });
    }
}

async function resetPassword(req, res) {
    const{ token, newPassword } = req.body;

    try{
        const decoded = authService.validateToken(token);
        const user = await User.findByPk(decoded.id);

        if(!user){
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }

        const hashedPassword = await authService.hashPassword(newPassword);
        user.password_users = hashedPassword;
        await user.save();

        res.status(200).json({ message: 'Senha redefinida com sucesso.' });
    }catch(err){
        console.error('Erro ao redefinir senha:', err);
        res.status(400).json({ message: 'Token inválido ou expirado.', error: err.message });
    }
}

// Helper function to handle response formats
function handleResponse(req, res, statusCode, message, redirectUrl, data = null) {
    if(req.headers['accept'] === 'application/json'){
        const response = { message, ...(data && { data }) };
        return res.status(statusCode).json(response);
    }

    req.addMessage(message);
    res.status(statusCode).redirect(redirectUrl);
}

module.exports = { login, logout, forgotPassword, resetPassword };
