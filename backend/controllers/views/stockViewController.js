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

    getAllStocks: async (req, res) => {
        try{
            const stocks = await stockViewService.getAllStocks();
            res.status(200).render("partials/stocks/stocksTable", { 
                layout: false,
                stocks: stocks || [],
                cssFiles: [],
            });
        }catch(error){
            console.error("Erro ao listar estoques:", error);
            res.status(500).send("Erro ao listar estoques.");
        }
    },

    searchStocksByNumberStore: async (req, res) => {
        const { numberStore } = req.query;

        try{
            const stocks = numberStore
                ? await stockViewService.getStockByStoreNumber(numberStore) 
                : await stockViewService.getAllStocks();

            if(numberStore && !stocks){
                return res.status(404).send("Estoque não encontrado");
            }

            res.render("partials/stocks/stocksTable", { 
                layout: false,
                stocks: Array.isArray(stocks) ? stocks : [stocks],
                cssFiles: [],
            });
        }catch(error){
            console.error("Erro ao buscar estoque por numero:", error);
            res.status(500).send("Erro ao buscar estoque.");
        }
    },

    getEditStockPage: async (req, res) => {
        try{
            const { stockId } = req.params;
            console.log("Stock ID recebido:", stockId);

            const { stock } = await stockViewService.getEditStockData(stockId);

            if(!stock){
                return res.status(404).send('Estoque não encontrada');
            }

            res.render('partials/stocks/editStocks', {
                layout: false,
                title: 'Editar Estoque',
                stock
            });
        }catch(error){
            console.error('Erro ao carregar página de edição:', error);
            res.status(500).send('Erro ao carregar a página de edição.');
        }
    },

};

module.exports = stockViewController;
