const jwt = require('jsonwebtoken');

async function authenticateToken(req, res, next) {
    const token = req.cookies?.token;

    if(!token){
        if(req.headers['accept'] === 'application/json') {
            return res.status(401).json({ message: 'Access Denied. No token provided.' });
        }

        req.addMessage('Acesso negado. Faça login para continuar.');
        return res.redirect('/login');
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;

        next();
    }catch(err){
        if(req.headers['accept'] === 'application/json'){
            return res.status(403).json({ message: 'Invalid token.', error: err.message });
        }

        req.addMessage('Sessão expirada ou token inválido. Faça login novamente.');
        return res.redirect('/login');
    }
}

module.exports = authenticateToken;
