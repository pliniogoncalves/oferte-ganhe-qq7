const stockService = require('../../services/stockService');
const storeService = require('../../services/storeService');
const talonService = require('../../services/talonService');

const stockViewService = {
    getPaginatedStocks: async (page, itemsPerPage) => {
        try {
            const currentPage = parseInt(page, 10) || 1;
            const offset = (currentPage - 1) * itemsPerPage;

            // Obter a contagem total de registros
            const totalItems = await stockService.countStocks();
            const totalPages = Math.ceil(totalItems / itemsPerPage);

            // Buscar os estoques com paginação e associações
            const stocks = await stockService.searchStocks({ itemsPerPage, offset });

            // Formatar os resultados e ajustar os nomes das lojas e talões
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
        } catch (error) {
            console.error('Erro ao buscar estoques paginados:', error.message);
            throw error;
        }
    },


};

module.exports = stockViewService;
