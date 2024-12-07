const stockService = require('../../services/stockService');
const storeService = require('../../services/storeService');
const talonService = require('../../services/talonService');

const stockViewService = {
    getPaginatedStocks: async (page, itemsPerPage) => {
        try {
            const currentPage = parseInt(page, 10) || 1;
            const offset = (currentPage - 1) * itemsPerPage;

            console.log('Calculando paginação:', { currentPage, offset, itemsPerPage });

            const totalItems = await storeService.countStores();
            const totalPages = Math.ceil(totalItems / itemsPerPage);

            console.log('Dados gerais de paginação:', { totalItems, totalPages });

            const stores = await storeService.getPaginatedStores(offset, itemsPerPage);
            console.log('Lojas paginadas:', stores);

            const formattedStocks = await Promise.all(
                stores.map(async store => {
                    const stock = await stockService.searchStockByStoreId(store.id_store);
                    console.log(`Estoque para loja ${store.id_store}:`, stock);

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

            console.log('Estoques formatados:', formattedStocks);

            return { stocks: formattedStocks, currentPage, totalPages };
        } catch (error) {
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
