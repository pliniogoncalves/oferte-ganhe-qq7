const stockService = require('../../services/stockService');
const storeService = require('../../services/storeService');
const talonService = require('../../services/talonService');

const stockViewService = {
    getPaginatedStocks: async (page, itemsPerPage) => {
        try{
            const currentPage = parseInt(page, 10) || 1;
            const totalItems = await stockService.countStocks();
            const totalPages = Math.ceil(totalItems / itemsPerPage);
            const offset = (currentPage - 1) * itemsPerPage;

            const stocks = await stockService.searchStocks({limit: itemsPerPage, offset})

            return {stocks, currentPage, totalPages};
        }catch(error){
            console.error('Erro ao buscar estoques paginados:', error.message);
            throw error;
        }
    },

    getAllStocks: async () => {
        try{
            return await stockService.searchStocks();
        }catch(error){
            console.error('Erro ao buscar todos os estoques:', error.message);
            throw error;
        }
    },

    getStockByStoreNumber: async (numberStore) => {
        try{
            return await stockService.searchStockByStoreNumber(numberStore);
        }catch(error){
            console.error(`Erro ao buscar estoque com numero ${numberStore}:`, error.message);
            throw error;
        }
    },

    getEditStockData: async (stockId) => {
        try {

            const stock = await stockService.searchStockById(stockId);

            if (!stock) throw new Error('Estoque não encontrado.');

            return {stock};
        } catch (error) {
            console.error('Erro ao buscar dados para edição do estoque:', error.message);
            throw error;
        }
    },
};

module.exports = stockViewService;
