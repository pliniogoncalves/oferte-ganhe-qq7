function alertPermission(requiredPermission) {
    return (req, res, next) => {
        const userPermissions = req.user?.permissions;

        if (!userPermissions || !userPermissions.includes(requiredPermission)) {
            const message = 'Você não tem permissão para acessar esta página.';

            // Se for uma requisição AJAX ou a resposta esperada for JSON
            if (req.xhr || req.headers['accept'] === 'application/json') {
                return res.status(403).json({ message });
            }

            // Se for uma requisição normal, renderiza a página de erro
            return res.status(403).render('noPermissionPage', {
                message,
                layout: false,
                cssFiles: []  // Defina os arquivos CSS ou use um array vazio
            });
        }

        next();
    };
}

module.exports = alertPermission;
