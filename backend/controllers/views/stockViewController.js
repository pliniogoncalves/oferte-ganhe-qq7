const stockViewService = require('../../services/views/stockViewService');

const stockViewController = {
    getStockPage: async (req, res) => {
        try{
            const itemsPerPage = 10;

            const { stocks, currentPage, totalPages } = await stockViewService.getPaginatedStocks(req.query.page, itemsPerPage);

            res.render('partials/stocks/stocks', {
                layout: false,
                title: 'Gestão de Estoques',
                stocks,
                currentPage,
                totalPages,
            });
        }catch(error){
            console.error('Erro ao carregar estoques:', error);
            res.status(500).send('Erro ao carregar a página de estoques.');
        }
    },

    getAddStockPage: async (req, res) => {
        try{
            const { stores, talons } = await stockViewService.getAddStockData();

            res.render('partials/stocks/addStocks', {
                layout: false,
                title: 'Cadastrar Estoque',
                stores,
                talons,
            });
        }catch(error){
            console.error('Erro ao carregar a página de cadastro de estoque:', error);
            res.status(500).send('Erro ao carregar a página.');
        }
    },

    getEditStockPage: async (req, res) => {
        try{
            const { storeNumber } = req.params;
            const { stock, store, /*talons*/ } = await stockViewService.getEditStockData(storeNumber);

            res.render('partials/stocks/editStocks', {
                layout: false,
                title: 'Editar Estoque',
                stock,
                store,
                /*talons*/
            });
        }catch(error){
            console.error('Erro ao carregar página de edição:', error);
            res.status(500).send('Erro ao carregar a página de edição.');
        }
    },

};

module.exports = stockViewController;
