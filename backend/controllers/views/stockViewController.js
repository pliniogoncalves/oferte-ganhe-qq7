const stockViewService = require('../../services/views/stockViewService');

const stockViewController = {
    getStockPage: async (req, res) => {
        try{
            const itemsPerPage = 10;

            const { stocks, currentPage, totalPages } = await stockViewService.getPaginatedStocks(req.query.page, itemsPerPage);

            res.render('partials/stocks/stocks', {
                layout: false,
                title: 'Gestão de Estoques',
                stocks: stocks,
                currentPage,
                totalPages,
            });
        }catch(error){
            console.error('Erro ao carregar estoques:', error);
            res.status(500).send('Erro ao carregar a página de estoques.');
        }
    },

    getEditStockPage: async (req, res) => {
        try{
            const { storeNumber } = req.params;;
            if (!storeNumber) throw new Error('Número da loja inválido.');

            console.log('storeNumber recebido:', storeNumber);

            const { stock, store } = await stockViewService.getEditStockData(storeNumber);

            res.render('partials/stocks/editStocks', {
                layout: false,
                title: 'Editar Estoque',
                stock: {
                    ...stock,
                    storeNumber: stock.storeNumber || '0',
                },
                store,
            });
        }catch(error){
            console.error('Erro ao carregar página de edição:', error);
            res.status(500).send('Erro ao carregar a página de edição.');
        }
    },

};

module.exports = stockViewController;
