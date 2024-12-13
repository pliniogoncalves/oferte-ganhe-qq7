function authorizePermission(requiredPermission) {
    return (req, res, next) => {
        const user = req.user;

        // Verifica se o usuário está autenticado
        if (!user) {
            req.addMessage('Usuário não autenticado.');
            return res.redirect('/login');
        }

        const userPermissions = user.permissions;

        // Verifica se o usuário possui a permissão necessária
        if (!userPermissions || !userPermissions.includes(requiredPermission)) {
            // Adiciona uma mensagem de erro para exibição no frontend
            req.addMessage('Você não tem permissão.');
            return res.redirect(req.headers.referer || '/index'); // Retorna para a página anterior ou inicial
        }

        next();
    };
}

module.exports = authorizePermission;
