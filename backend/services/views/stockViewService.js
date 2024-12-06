const stockService = require('../../services/stockService');
const storeService = require('../../services/storeService');
const talonService = require('../../services/talonService');

const stockViewService = {
    getPaginatedStocks: async (page, itemsPerPage) => {
        try{
            const currentPage = parseInt(page, 10) || 1;
            const offset = (currentPage - 1) * itemsPerPage;

            const totalItems = await stockService.countStocks();
            const totalPages = Math.ceil(totalItems / itemsPerPage);

            const stocks = await stockService.searchStocks({ itemsPerPage, offset });

            const formattedStocks = stocks.map(stock => ({
                id_stock: stock.id_stock,
                id_store: stock.id_store,
                id_talon: stock.id_talon,
                current_stock: stock.current_stock,
                minimum_stock: stock.minimum_stock,
                recommended_stock: stock.recommended_stock,
                status_stock: stock.status_stock,
                storeName: stock.Store ? stock.Store.name_store : 'Loja não encontrada',
                talonName: stock.Talon ? stock.Talon.name_talon : 'Talão não encontrado',
            }));

            return { stocks: formattedStocks, currentPage, totalPages };
        }catch(error){
            console.error('Erro ao buscar estoques paginados:', error.message);
            throw error;
        }
    },

    getAddStockData: async () => {
        try{
            const stores = await storeService.getAllStores();
            const talons = await talonService.getAllTalons();
            return { stores, talons };
        }catch(error){
            console.error('Erro ao buscar dados para adicionar novo estoque:', error.message);
            throw error;
        }
    },

    getStockById: async (id_stock) => {
        try{
            const stock = await stockService.getStockById(id_stock);
            if (!stock) throw new Error('Estoque não encontrado.');

            const store = await storeService.getStoreById(stock.id_store);
            const talon = await talonService.getTalonById(stock.id_talon);

            return{
                ...stock.dataValues,
                Store: store ? store.name_store : 'Loja não encontrada',
                Talon: talon ? talon.name_talon : 'Talão não encontrado',
            };
        }catch(error){
            console.error(`Erro ao buscar estoque por ID ${id_stock}:`, error.message);
            throw error;
        }
    },

    // Método para buscar dados para editar um estoque
    getEditStockData: async (id_stock) => {
        try{
            const stock = await stockService.getStockById(id_stock);
            const stores = await storeService.getAllStores();
            const talons = await talonService.getAllTalons();

            if (!stock) throw new Error('Estoque não encontrado.');

            return { stock, stores, talons };
        }catch(error){
            console.error('Erro ao buscar dados para edição do estoque:', error.message);
            throw error;
        }
    },


};

module.exports = stockViewService;
