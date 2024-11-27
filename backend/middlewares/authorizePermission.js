function authorizePermission(requiredPermission) {
    return (req, res, next) => {
        const userPermissions = req.user.permissions;

        if (!userPermissions || !userPermissions.includes(requiredPermission)) {
            return res.status(403).json({ message: 'Access Forbidden. You do not have permission to access this resource.' });
        }

        next();
    };
}

module.exports = authorizePermission;
