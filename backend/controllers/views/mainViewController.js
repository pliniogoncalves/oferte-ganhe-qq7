const mainViewController = {

    getMainPage: (req, res) => {
        res.render('main', { 
            layout: 'layouts/mainLayout', 
            title: 'Página Inicial - Dashboard',
            cssFiles: [
                '/css/global.css', 
                '/css/header.css', 
                '/css/sidebar.css', 
                'css/buttons.css'
            ], 
        });
    },
    
};

module.exports = mainViewController;
