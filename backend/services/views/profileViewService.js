const profileService = require('../../services/profileService');
const permissionService = require('../../services/permissionService');
const profilePermissionService = require('../../services/profilePermissionService')

const profileViewService = {
    getPaginatedProfiles: async (page, itemsPerPage) => {
        try{
            const currentPage = parseInt(page, 10) || 1;
            const totalItems = await profileService.countProfiles();
            const totalPages = Math.ceil(totalItems / itemsPerPage);
            const offset = (currentPage - 1) * itemsPerPage;
            
            const profiles = await profileService.searchProfile({ limit: itemsPerPage, offset })

            for (let profile of profiles) {
                const profilePermissions = await profilePermissionService.searchPermissionsByProfile(profile.name_profile);
                profile.Permissions = profilePermissions;
            }

            return { profiles, currentPage, totalPages };
        }catch(error){
            console.error('Erro ao buscar perfis paginados:', error.message);
            throw error;
        }
    },

    getAddProfileData: async () => {
        try{
            const permissions = await permissionService.searchPermission();
            return { permissions };
        }catch(error){
            console.error('Erro ao buscar dados para adicionar novo perfil:', error.message);
            throw error;
        }
    },

    getAllProfiles: async () => {
        try{
            return await profilePermissionService.searchAllProfilesWithPermissions();
        }catch(error){
            console.error('Erro ao buscar perfis:', error.message);
            throw error;
        }
    },

    getProfileByname: async (name) => {
        try{
            const profileWithPermissions = await profilePermissionService.searchPermissionsByProfile(name);
            
            if(!profileWithPermissions){
            throw new Error(`Perfil com nome '${name}' não encontrado.`);
            }

        return{
            name_profile: profileWithPermissions.name_profile,
            Permissions: profileWithPermissions.permissions || [],
        };

        }catch(error){
            console.error(`Erro ao buscar Perfil por nome ${name}:`, error.message);
            throw error;
        }
    },

    getEditProfileData: async (name) => {
        try{
            const profile = await profileService.searchProfileName(name);
            const permissions = await permissionService.searchPermission();
            const profilePermissions = await profilePermissionService.searchPermissionsByProfile(profile.name_profile);

            return { profile, permissions, profilePermissions };
        }catch(error){
            console.error('Erro ao buscar dados para edição do perfil:', error.message);
            throw error;
        }
    }, 

};

module.exports = profileViewService;
