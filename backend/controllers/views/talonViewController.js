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
                    id: user?.id_users || 'ID não encontrado',
                    role: user.profile?.name_profile || 'Usuário',
                    storeId: user?.store?.number_store || null,
                },
            });
        }catch(error){
            console.error('Erro ao carregar a página de cadastro de Talão:', error);
            res.status(500).send('Erro ao carregar a página.');
        }
    },

    getUpdateTalonPage: async (req, res) => {
        try {
            const userRegistration = req.user?.registration;
    
            if(!userRegistration){
                throw new Error('Usuário não autenticado ou token inválido.');
            }
    
            const { talons, user } = await talonViewService.getUpdateTalonData(userRegistration);
            const pendingTalons = talons.filter(talon => talon.status_talon === 'Enviado');
    
            res.render('partials/talons/updateTalons', {
                layout: false,
                talons: pendingTalons.length > 0 ? pendingTalons : [],
                title: 'Registrar Recebimento',
                message: pendingTalons.length === 0 ? 'Nenhum talão enviado encontrado.' : null,
                userDetails: {
                    id: user?.id_users || 'ID não encontrado',
                    role: user.profile?.name_profile || 'Usuário',
                    storeId: user?.store?.number_store || null,
                },
            });
        } catch (error) {
            console.error('Erro ao carregar talões enviados:', error.message);
            res.status(500).send('Erro ao carregar a página de confirmar talões');
        }
    },
    
    getEditTalonPage: async (req, res) => {
        try{
            const { id } = req.params;
            const { talon, stores, users } = await talonViewService.getEditTalonData(id);
    
            if(!talon){
                return res.status(404).send('Talão não encontrado');
            }
    
            res.render('partials/talons/editTalons', {
                layout: false,
                talon,
                stores,
                users,
                title: 'Editar Talão',
            });
        } catch (error) {
            console.error('Erro ao carregar edição completa de talão:', error.message);
            res.status(500).send('Erro ao carregar a página de edição completa do talão');
        }
    },
}

module.exports = talonViewController;