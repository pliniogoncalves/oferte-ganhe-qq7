const talonViewService = require('../../services/views/talonViewService');

const talonViewController = {
    getTalonPage: async (req, res) => {
        try{
            const itemsPerPage = 10; 
            const { talons, currentPage, totalPages } = await talonViewService.getPaginatedTalons(req.query.page, itemsPerPage);

            res.render('partials/talons/talons', { 
                layout: false, 
                title: 'Gestão de Talões',
                talons,
                currentPage,
                totalPages,
            });
        }catch(error){
            console.error('Erro ao carregar talões:', error);
            res.status(500).send('Erro ao carregar a página de talões');
        }
    },

    getAddTalonPage: async (req, res) => {
        try{
            const userRegistration = req.user?.registration;
            
            if(!userRegistration){
                throw new Error('Usuário não autenticado ou token inválido.');
            }

            const { stores, user } = await talonViewService.getAddTalonData(userRegistration);
    
            res.render('partials/talons/addTalons', {
                layout: false,
                title: 'Solicitar Talão',
                stores,
                user,
                userDetails: {
                    role: user.profile?.name_profile || 'Usuário',
                    storeId: user?.store?.number_store || null,
                },
            });
        }catch(error){
            console.error('Erro ao carregar a página de cadastro de Talão:', error);
            res.status(500).send('Erro ao carregar a página.');
        }
    },
}

module.exports = talonViewController;