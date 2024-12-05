const storeService = require('../../services/storeService');;

const storeViewService = {
    getPaginatedStores: async (page, itemsPerPage) => {
        try{
            const currentPage = parseInt(page, 10) || 1;
            const totalItems = await storeService.countStores();
            const totalPages = Math.ceil(totalItems / itemsPerPage);
            const offset = (currentPage - 1) * itemsPerPage;
            const stores = await storeService.searchStore({ limit: itemsPerPage, offset });

            return { stores, currentPage, totalPages };
        }catch(error){
            console.error('Erro ao buscar lojas paginadas:', error.message);
            throw error;
        }
    },

    getAllStores: async () => {
        try{
            return await storeService.searchStore();
        }catch(error){
            console.error('Erro ao buscar todas as lojas:', error.message);
            throw error;
        }
    },

    getStoreByNumber: async (number) => {
        try{
            return await storeService.searchStoreNumber(number);
        }catch(error){
            console.error(`Erro ao buscar loja com numero ${number}:`, error.message);
            throw error;
        }
    },

    getEditStoreData: async (number) => {
        try{
            const store = await storeService.searchStoreNumber(number);
            if(!store) {
                throw new Error(`Loja com o número ${number} não encontrada.`);
            }
            return { store };
        }catch(error){
            console.error(`Erro ao buscar dados para edição de loja ${number}:`, error.message);
            throw error;
        }
    },
  
};

module.exports = storeViewService;
