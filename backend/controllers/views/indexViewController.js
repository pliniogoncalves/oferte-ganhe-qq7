const indexViewController = {

    getIndexPage: (req, res) => {
        res.render('index', { 
            layout: 'layouts/indexLayout', 
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

module.exports = indexViewController;
