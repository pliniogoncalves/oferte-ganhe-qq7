const profilePermissionService = require('../services/profilePermissionService.js');

//Controller for the profile-permission page
const profilePermissionController = {
    
    //Profile Permission main page
    getProfilePermissionPage: (req, res) => {
        res.send("Página de Associações de Perfil e Permissão");
    },

    //Function to associate a new permission to a profile
    insertProfilePermission: async (req, res) => {
        const { profileName, permissionName } = req.body;

        try{
            const newProfilePermission = await profilePermissionService.insertProfilePermission(profileName, permissionName);

            res.status(201).json({ message: 'Permission associated to Profile successfully!', profilePermission: newProfilePermission });

        }catch(err){
            res.status(500).json({ message: 'Error associating Permission to Profile', error: err.message });
        }
    },

    //Function to search for permissions associated with a specific profile 
    searchPermissionsByProfile: async (req, res) => {
        const { profileName } = req.params;

        try{
            const profileWithPermissions = await profilePermissionService.searchPermissionsByProfile(profileName);
            
            res.status(200).json(profileWithPermissions);
        }catch(err){
            res.status(500).json({ message: 'Error fetching permissions for profile', error: err.message });

            if(err.message.includes("not found")){
                res.status(404).json({ message: err.message });
            }else{
                res.status(500).json({ message: 'Error fetching permissions for profile.', error: err.message });
            }
        }
    },

    //Function to list all profiles with their permissions
    searchAllProfilesWithPermissions: async (req, res) => {
        try{
            const profilesWithPermissions = await profilePermissionService.searchAllProfilesWithPermissions();
            res.status(200).json(profilesWithPermissions);
        }catch(err){
            res.status(500).json({ message: 'Error fetching all profiles with permissions', error: err.message });
        }
    },

    //Function to remove a permission from a profile
    removePermissionFromProfile: async (req, res) => {
        const { profileName, permissionName } = req.params;

        try{
            const removedProfilePermission = await profilePermissionService.removePermissionFromProfile(profileName, permissionName);
            if(removedProfilePermission){
                res.status(200).json({ message: 'Permission removed from Profile successfully!', profilePermission: removedProfilePermission });
            }else{
                res.status(404).json({ message: 'Permission not found for this profile.' });
            }
        }catch(err){
            res.status(500).json({ message: 'Error removing Permission from Profile', error: err.message });
        }
    },
};

module.exports = profilePermissionController;
