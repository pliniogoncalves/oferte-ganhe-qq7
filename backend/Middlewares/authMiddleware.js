const jwt = require('jsonwebtoken');

async function authenticateToken(req, res, next) {
    const token = req.cookies?.token;
    if(!token){
        return res.status(401).json({ message: 'Access Denied. No token provided.' });
    }

    try{
        // Check the validity of the token
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified; 
        next();
    }catch(err){
        res.status(403).json({ message: 'Invalid token.', error: err.message });
    }
}

module.exports = authenticateToken;
