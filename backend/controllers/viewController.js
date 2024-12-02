const viewController = {

    getLoginPage: (req, res) => {
        res.render('login', { 
            layout: 'layouts/loginLayout', 
            title: 'Login', 
            cssFiles: ['/css/login.css'],
            messages: res.locals.messages
        });
    },

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
    
    getUserPage: (req, res) => {
        res.render('partials/users', { 
            layout: false, 
            title: 'Gestão de Usuários'
        });
    },

    getDashboard: (req, res) => {
        res.render('dashboard', {
            layout: false,
            title: 'Dashboard Principal'
        });
    }
};

module.exports = viewController;
