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

    getEditStockData: async (storeNumber) => {
        try {
            console.log('Buscando dados para edição com storeNumber:', storeNumber);

            const store = await storeService.searchStoreNumber(storeNumber);
            console.log('Loja encontrada:', store);

            if (!store) throw new Error('Loja não encontrada.');

            const stock = await stockService.searchStockByStoreId(store.id_store);
            console.log(`Estoque encontrado para loja ${store.id_store}:`, stock);

            return {
                stock: stock || {
                    id_stock: null,
                    id_store: store.id_store,
                    storeNumber: store.number_store,
                    current_stock: 0,
                    minimum_stock: 0,
                    recommended_stock: 0,
                    status_stock: 'Indefinido',
                },
                store,
            };
        } catch (error) {
            console.error('Erro ao buscar dados para edição do estoque:', error.message);
            throw error;
        }
    },
};

module.exports = stockViewService;
