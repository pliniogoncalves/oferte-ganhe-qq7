const userService = require('../../services/userService');
const profileService = require('../../services/profileService');
const storeService = require('../../services/storeService');

const userViewService = {
    getPaginatedUsers: async (page, itemsPerPage) => {
        try{
            const currentPage = parseInt(page, 10) || 1;
            const totalItems = await userService.countUsers();
            const totalPages = Math.ceil(totalItems / itemsPerPage);
            const offset = (currentPage - 1) * itemsPerPage;
            const users = await userService.searchUser({ limit: itemsPerPage, offset });

            return { users, currentPage, totalPages };
        }catch(error){
            console.error('Erro ao buscar usuários paginados:', error.message);
            throw error;
        }
    },

    getAddUserData: async () => {
        try{
            const profiles = await profileService.searchProfile();
            const stores = await storeService.searchStore();

            return { profiles, stores };
        }catch(error){
            console.error('Erro ao buscar dados para adicionar novo usuário:', error.message);
            throw error;
        }
    },

    getAllUsers: async () => {
        try{
            return await userService.searchUser();
        }catch(error){
            console.error('Erro ao buscar todos os usuários:', error.message);
            throw error;
        }
    },

    getUserByRegistration: async (registration) => {
        try{
            return await userService.searchUserRegistration(registration);
        }catch(error){
            console.error(`Erro ao buscar usuário com matrícula ${registration}:`, error.message);
            throw error;
        }
    },

    getEditUserData: async (registration) => {
        try{
            const user = await userService.searchUserRegistration(registration);
            const profiles = await profileService.searchProfile();
            const stores = await storeService.searchStore();

            return { user, profiles, stores };
        }catch(error){
            console.error(`Erro ao buscar dados para edição do usuário ${registration}:`, error.message);
            throw error;
        }
    },
  
};

module.exports = userViewService;
