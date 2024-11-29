function authorizePermission(requiredPermission) {
    return (req, res, next) => {
        const userPermissions = req.user.permissions;

        if (!userPermissions || !userPermissions.includes(requiredPermission)) {
            return res.status(403).render('login', { errorMessage: 'Acesso bloqueado' })
        }

        next();
    };
}

module.exports = authorizePermission;
