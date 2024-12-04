const mainViewController = {

    getMainPage: (req, res) => {
        res.render('main', { 
            layout: 'layouts/mainLayout', 
            title: 'Página Inicial - Dashboard',
            cssFiles: [
                '/css/global.css', 
                '/css/header.css', 
                '/css/sidebar.css', 
                'css/buttons.css',
                'css/tables.css',
                'css/notifications.css',
                'css/modal.css',
                'css/responsive.css',
            ], 
        });
    },
    
};

module.exports = mainViewController;
