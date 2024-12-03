const userService = require('../../services/userService');
const profileService = require('../../services/profileService');
const storeService = require('../../services/storeService');

const userViewController = {
    
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

        try{
            const user = await userService.searchUserRegistration(registration);

            if(!user){
                return res.status(404).send('Usuário não encontrado');
            }

            res.render('partials/users/usersTable', {
                layout: false,
                users: [user],
            });
        }catch(error){
            console.error('Erro ao buscar usuário por matrícula:', error);
            res.status(500).send('Erro ao buscar usuário.');
        }
    },

    getEditUserPage: async (req, res) => {
        try{
            const { registration } = req.params;

            const users = await userService.searchUserRegistration(registration);

            if(!users){
                return res.status(404).send('Usuário não encontrado');
            }

            const profiles = await profileService.searchProfile();
            const stores = await storeService.searchStore();

            res.render('partials/users/editUsers', {
                layout: false,
                users:users,
                profiles: profiles,
                stores: stores,
                title: 'Editar Usuário',
            });
        }catch(error){
            console.error('Erro ao carregar edição:', error);
            res.status(500).send('Erro ao carregar a página de edição');
        }
    },
    
};

module.exports = userViewController;
