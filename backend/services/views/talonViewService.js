const talonService = require('../../services/talonService');
const userService = require('../../services/userService');
const profileService = require('../../services/profileService');
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
}

module.exports = talonViewService;