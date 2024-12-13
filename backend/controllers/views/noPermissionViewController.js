const noPermissionViewController = {

    getnoPermissionPage: (req, res) => {
        const cssFiles = [];

        if (req.xhr || req.headers['accept'] === 'application/json') {
            return res.status(403).json({ message: 'Você não tem permissão para acessar esta página.' });
        }

        res.render('noPermissionPage', { 
            layout: false, 
            title: 'Sem Permição',
            cssFiles,
        });
    },
    
};

module.exports = noPermissionViewController;
