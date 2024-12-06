const stockViewService = require('../../services/views/stockViewService');

const stockViewController = {
    getStockPage: async (req, res) => {
        try {
            const itemsPerPage = 10;

            const { stocks, currentPage, totalPages } = await stockViewService.getPaginatedStocks(req.query.page, itemsPerPage);

            res.render('partials/stocks/stocks', {
                layout: false,
                title: 'Gestão de Estoques',
                stocks,
                currentPage,
                totalPages,
            });
        } catch (error) {
            console.error('Erro ao carregar estoques:', error);
            res.status(500).send('Erro ao carregar a página de estoques.');
        }
    },

};

module.exports = stockViewController;
