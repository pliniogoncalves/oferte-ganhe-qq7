const permissionService = require('../services/permissionService.js')

//Controller for the permission page
const permissionController = {
    
    getUserPage: (req, res) => {
        res.send("Página das Permissões");
    },

    //Function to register a new Permission
    insertPermission: async (req, res) => {
        const {name} = req.body;

        try{
            const newPermission = await permissionService.insertPermission(name);
            res.status(201).json({ message: 'Permission registered successfully!', permission: newPermission});
        }catch(erro){
            res.status(500).json({ message: 'Error registering Permission', erro: erro.message});
        }
    },

    //Function to Search All Permission
    searchPermission: async (req, res) => {
        try{
            const permissions = await permissionService.searchPermission();
            res.status(200).json(permissions);
        }catch(err){
            res.status(500).json({ message: 'Error fetching all Permission', error: err.message });
        }
    },

    //Function to Search for a Permission by name
    searchPermissionName: async (req, res) => {
        const { name } = req.params;

        try{
            const result = await permissionService.searchPermissionName(name);
            if(result){
                res.status(200).json(result);
            }else{
                res.status(404).json({ message: 'Permission not found' });
            }
        }catch(err){
            res.status(500).json({ message: 'Error fetching Permission', error: err.message });
        }
    },

    //Function to edit an existing Permission
    editPermission: async (req, res) =>{
        const { name } = req.params;
        const { newName } = req.body;

        try{
            const updatePermission = await permissionService.editPermission(newName, name);
            if(updatePermission){
                res.status(200).json({ message: 'Permission updated successfully!', permission: updatePermission });
            }else{
                res.status(404).json({ message: 'Permission not found.' });
            }
        }catch(erro){
            res.status(500).json({ message: 'Error editing Permission', error: erro.message });
        }
    },

    //Function to delete a Permission
    removePermission: async (req, res) => {
        const { name } = req.params;

        try{
            const removedPermission = await permissionService.removePermission(name);
            if(removedPermission){
                res.status(200).json({ message: 'Permission deleted successfully!', permission: removedPermission });
            }else{
                res.status(404).json({ message: 'Permission not found.' });
            }
        }catch(erro){
            res.status(500).json({ message: 'Error deleting Permission', error: erro.message });
        }
    },
};

module.exports = permissionController;
