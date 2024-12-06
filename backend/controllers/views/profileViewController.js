const profileViewService = require('../../services/views/profileViewService');

const profileViewController = {
    getProfilePage: async (req, res) => {
        try{
            const itemsPerPage = 10;

            const { profiles, currentPage, totalPages } = await profileViewService.getPaginatedProfiles(req.query.page, itemsPerPage);

            res.render('partials/profiles/profiles', {
                layout: false,
                title: 'Gestão de Perfis',
                profiles,
                currentPage,
                totalPages,
            });
        }catch(error){
            console.error('Erro ao carregar perfis:', error);
            res.status(500).send('Erro ao carregar a página de perfis.');
        }
    },

    getAddProfilePage: async (req, res) => {
        try{
            const { permissions } = await profileViewService.getAddProfileData();

            res.render('partials/profiles/addProfiles', {
                layout: false,
                title: 'Cadastrar Perfil',
                permissions,
            });
        }catch(error){
            console.error('Erro ao carregar a página de cadastro de perfil:', error);
            res.status(500).send('Erro ao carregar a página.');
        }
    },

    getAllProfiles: async (req, res) => {
        try {
            const profiles = await profilePermissionService.searchAllProfilesWithPermissions();
    
            res.status(200).json(profiles);
        } catch (error) {
            console.error("Erro ao listar perfis:", error);
            res.status(500).json({ message: "Erro ao listar perfis." });
        }
    },

    searchProfilesByName: async (req, res) => {
        const { name } = req.query;
    
        try{
            let profiles;
            if(name){
                profiles = await profileViewService.getProfileByname(name);
                if(!profiles){
                    return res.status(404).send("Perfil não encontrado.");
                }
                profiles = Array.isArray(profiles) ? profiles : [profiles];
            }else{
                profiles = await profileViewService.getAllProfiles();
            }
    
            res.render("partials/profiles/profilesTable", {
                layout: false,
                profiles
            });
        }catch(error){
            console.error("Erro ao buscar perfil por nome:", error.message);
            res.status(500).send("Erro ao buscar perfil.");
        }
    },

    getEditProfilePage: async (req, res) => {
        try{
            const { name } = req.params;
            const { profile, permissions, profilePermissions } = await profileViewService.getEditProfileData(name);

            if (!profile) {
                return res.status(404).send('Perfil não encontrado.');
            }

            res.render('partials/profiles/editProfiles', {
                layout: false,
                title: 'Editar Perfil',
                profile,
                permissions,
                profilePermissions,
            });
            
        }catch(error){
            console.error('Erro ao carregar página de edição:', error);
            res.status(500).send('Erro ao carregar a página de edição.');
        }
    },
};

module.exports = profileViewController;
