function authorizePermission(requiredPermission) {
    return (req, res, next) => {
        const userPermissions = req.user.permissions;

        if (!userPermissions.includes(requiredPermission)) {
            req.addMessage('Usuário não autorizado.');
            return res.redirect('/login');
        }

        next();
    };
}

module.exports = authorizePermission;
