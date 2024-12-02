const userService = require('../services/userService');

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
    
    getUserPage: async(req, res) => {
        try{
            const users = await userService.searchUser();

            res.render('partials/users/users', { 
                layout: false, 
                title: 'Gestão de Usuários',
                users: users,
            });
        }catch(error){
            console.error('Erro ao carregar usuários:', error);
            res.status(500).send('Erro ao carregar a página de usuários');
        }     
    },

    getAddUserPage: (req, res) =>{
        res.render('partials/users/addUsers', {
            layout: false,
            title: 'Cadastrar Usuário',
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
