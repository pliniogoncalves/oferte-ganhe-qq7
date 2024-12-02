const userService = require('../services/userService');
const profileService = require('../services/profileService');

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

    searchUsersByRegistration: async (req, res) => {
        const { registration } = req.query;

        try {
            const user = await userService.searchUserRegistration(registration);

            if (!user) {
                return res.status(404).send('Usuário não encontrado');
            }

            res.render('partials/users/usersTable', {
                layout: false,
                users: [user], // Passa como lista para reutilizar o template de tabela
            });
        } catch (error) {
            console.error('Erro ao buscar usuário por matrícula:', error);
            res.status(500).send('Erro ao buscar usuário.');
        }
    },

    getEditUserPage: async (req, res) => {
        try {
            const { registration } = req.params;
            const user = await userService.searchUserRegistration(registration);

            if (!user) {
                return res.status(404).send('Usuário não encontrado');
            }

            res.render('partials/users/editUsers', {
                layout: false,
                user,
                title: 'Editar Usuário',
            });
        } catch (error) {
            console.error('Erro ao carregar edição:', error);
            res.status(500).send('Erro ao carregar a página de edição');
        }
    },

    getProfilePage: async(req, res) => {
        try{
            const profiles = await profileService.searchProfile();

            res.render('partials/profiles/profiles', { 
                layout: false, 
                title: 'Gestão de Perfis',
                profiles: profiles,
            });
        }catch(error){
            console.error('Erro ao carregar Perfis:', error);
            res.status(500).send('Erro ao carregar a página de Perfis');
        }     
    },
};

module.exports = viewController;
