const stockService = require('../../services/stockService');
const storeService = require('../../services/storeService');
const talonService = require('../../services/talonService');

const stockViewService = {
    getPaginatedStocks: async (page, itemsPerPage) => {
        try {
            const currentPage = parseInt(page, 10) || 1;
            const offset = (currentPage - 1) * itemsPerPage;

            const totalItems = await storeService.countStores();
            const totalPages = Math.ceil(totalItems / itemsPerPage);

            const stores = await storeService.getPaginatedStores(offset, itemsPerPage);
            
            const formattedStocks = await Promise.all(
                stores.map(async store => {
                    const stock = await stockService.searchStockByStoreId(store.id_store);
                    return {
                        id_store: store.id_store,
                        storeName: store.name_store,
                        storeNumber: store.number_store,
                        current_stock: stock ? stock.current_stock : 0,
                        minimum_stock: stock ? stock.minimum_stock : 0,
                        recommended_stock: stock ? stock.recommended_stock : 0,
                        status_stock: stock ? stock.status_stock : 'Sem Estoque',
                    };
                })
            );

            return { stocks: formattedStocks, currentPage, totalPages };
        } catch (error) {
            console.error('Erro ao buscar estoques paginados:', error.message);
            throw error;
        }
    },

    getAddStockData: async () => {
        try{
            const stores = await storeService.getAllStores();
            //const talons = await talonService.getAllTalons();
            return { stores, /*talons*/ };
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
                Talon: talon ? talon.id_talon : 'Talão não encontrado',
            };
        }catch(error){
            console.error(`Erro ao buscar estoque por ID ${id_stock}:`, error.message);
            throw error;
        }
    },

    getEditStockData: async (storeNumber) => {
        try{
            const store = await storeService.getStoreByNumber(storeNumber);
            if (!store) throw new Error('Loja não encontrada.');
        
            //const talons = await talonService.getAllTalons();

            const stock = await stockService.getStockById(id_stock);
            if (!stock) throw new Error('Estoque não encontrado.');

            return { stock, store, /*talons*/ };
        }catch(error){
            console.error('Erro ao buscar dados para edição do estoque:', error.message);
            throw error;
        }
    },

};

module.exports = stockViewService;
