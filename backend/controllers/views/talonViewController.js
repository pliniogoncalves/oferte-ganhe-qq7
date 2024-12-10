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
}

module.exports = talonViewController;