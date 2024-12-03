const profileService = require('../../services/profileService');

const profileViewController = {

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

module.exports = profileViewController;
