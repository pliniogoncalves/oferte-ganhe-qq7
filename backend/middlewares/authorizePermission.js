function authorizePermission(requiredPermission) {
    return(req, res, next) => {
        const userPermissions = req.user?.permissions;

        if(!userPermissions || !userPermissions.includes(requiredPermission)){
            const message = 'Usuário não autorizado.';

            if(req.headers['accept'] === 'application/json'){
                return res.status(403).json({ message });
            }

            req.addMessage(message);
            return res.redirect('/login');
        }

        next();
    };
}

module.exports = authorizePermission;
