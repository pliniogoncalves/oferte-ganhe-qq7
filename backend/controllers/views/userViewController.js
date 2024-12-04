const userViewService = require('../../services/views/userViewService.js');

const userViewController = {
    getUserPage: async (req, res) => {
        try{
            const itemsPerPage = 10; 
            const { users, currentPage, totalPages } = await userViewService.getPaginatedUsers(req.query.page, itemsPerPage);

            res.render('partials/users/users', { 
                layout: false, 
                title: 'Gestão de Usuários',
                users,
                currentPage,
                totalPages,
            });
        }catch(error){
            console.error('Erro ao carregar usuários:', error);
            res.status(500).send('Erro ao carregar a página de usuários');
        }
    },

    getAddUserPage: async (req, res) => {
        try{
            const { profiles, stores } = await userViewService.getAddUserData();
    
            res.render('partials/users/addUsers', {
                layout: false,
                title: 'Cadastrar Usuário',
                profiles,
                stores,
            });
        }catch(error){
            console.error('Erro ao carregar a página de cadastro de usuário:', error);
            res.status(500).send('Erro ao carregar a página.');
        }
    },

    getAllUsers: async (req, res) => {
        try{
            const users = await userViewService.getAllUsers();
            res.status(200).render("partials/users/usersTable", { 
                layout: false,
                users: users || [],
                cssFiles: [],
            });
        }catch(error){
            console.error("Erro ao listar usuários:", error);
            res.status(500).send("Erro ao listar usuários.");
        }
    },

    searchUsersByRegistration: async (req, res) => {
        const { registration } = req.query;

        try{
            const users = registration 
                ? await userViewService.getUserByRegistration(registration) 
                : await userViewService.getAllUsers();

            if(registration && !users){
                return res.status(404).send("Usuário não encontrado");
            }

            res.render("partials/users/usersTable", { 
                layout: false,
                users: Array.isArray(users) ? users : [users],
                cssFiles: [],
            });
        }catch(error){
            console.error("Erro ao buscar usuário por matrícula:", error);
            res.status(500).send("Erro ao buscar usuário.");
        }
    },

    getEditUserPage: async (req, res) => {
        try{
            const { registration } = req.params;
            const { user, profiles, stores } = await userViewService.getEditUserData(registration);

            if(!user){
                return res.status(404).send('Usuário não encontrado');
            }

            res.render('partials/users/editUsers', {
                layout: false,
                users: user,
                profiles,
                stores,
                title: 'Editar Usuário',
            });
        }catch(error){
            console.error('Erro ao carregar edição:', error);
            res.status(500).send('Erro ao carregar a página de edição');
        }
    },
};

module.exports = userViewController;
