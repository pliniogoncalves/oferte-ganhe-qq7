const userService = require('../../services/userService');
const profileService = require('../../services/profileService');
const storeService = require('../../services/storeService');

const userViewService = {
    getPaginatedUsers: async (page, itemsPerPage) => {
        const currentPage = parseInt(page) || 1;
        const totalItems = await userService.countUsers();
        const totalPages = Math.ceil(totalItems / itemsPerPage);
        const offset = (currentPage - 1) * itemsPerPage;
        const users = await userService.searchUser({ limit: itemsPerPage, offset });

        return { users, currentPage, totalPages };
    },

    getAllUsers: async () => {
        return await userService.searchUser();
    },

    getUserByRegistration: async (registration) => {
        return await userService.searchUserRegistration(registration);
    },

    getEditUserData: async (registration) => {
        const user = await userService.searchUserRegistration(registration);
        const profiles = await profileService.searchProfile();
        const stores = await storeService.searchStore();

        return { user, profiles, stores };
    },
};
module.exports = userViewService;
