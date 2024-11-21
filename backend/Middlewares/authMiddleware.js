const jwt = require('jsonwebtoken');
const pool = require('../config/database');

async function authenticateToken(req, res, next) {
    const token = req.header('Authorization')?.split(' ')[1];
    if(!token){
        return res.status(401).json({ message: 'Access Denied. No token provided.' });
    }

    try{
        // Check if the token is in the revoked token list
        const query = `SELECT * FROM postgres."oferte-ganhe".RevokedTokens WHERE token = $1`;
        const result = await pool.query(query, [token]);

        if(result.rows.length > 0) {
            return res.status(403).json({ message: 'Token has been revoked.' });
        }

        // Check the validity of the token
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified; 
        next();
    }catch(err){
        res.status(403).json({ message: 'Invalid token.', error: err.message });
    }
}

module.exports = authenticateToken;
