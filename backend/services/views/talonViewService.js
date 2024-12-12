const talonService = require('../../services/talonService');
const userService = require('../../services/userService');
const storeService = require('../../services/storeService');

const talonViewService = {
    getPaginatedTalons: async (page, itemsPerPage) => {
        try{
            const currentPage = parseInt(page, 10) || 1;
            const totalItems = await talonService.countTalons();
            const totalPages = Math.ceil(totalItems / itemsPerPage);
            const offset = (currentPage - 1) * itemsPerPage;
            const talons = await talonService.searchTalons({ limit: itemsPerPage, offset });

            return { talons, currentPage, totalPages };
        }catch(error){
            console.error('Erro ao buscar talões paginados:', error.message);
            throw error;
        }
    },

    getAddTalonData: async (userRegistration) => {
        try{
            const stores = await storeService.searchStore();
            const user = await userService.searchUserRegistration(userRegistration)

            return { stores, user };
        }catch(error){
            console.error('Erro ao buscar dados para adicionar novo Talão:', error.message);
            throw error;
        }
    },
}

module.exports = talonViewService;