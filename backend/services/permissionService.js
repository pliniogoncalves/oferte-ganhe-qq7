const Permission = require('../models/Permission');

//Insert a new Permission
async function insertPermission(name) {
    try{
        const permission = await Permission.create({ name_permission: name });
        return permission;
    }catch(err){
        console.error('Error inserting Permission:', err);
        throw err;
    }
}

//Fetch all Permissions
async function searchPermission() {
    try{
        const permissions = await Permission.findAll();
        return permissions;
    }catch(err){
        console.error('Error fetching Permissions:', err);
        throw err;
    }
}

//Search Permission by name
async function searchPermissionName(name) {
    try{
        const permission = await Permission.findOne({ where: { name_permission: name } });
        return permission;
    }catch(err){
        console.error('Error fetching Permission by name:', err);
        throw err;
    }
}

//Edit Permission
async function editPermission(newName, name) {
    try{
        const [updated] = await Permission.update(
            { name_permission: newName },
            { where: { name_permission: name } }
        );
        if(updated){
            return await Permission.findOne({ where: { name_permission: newName } });
        }
        throw new Error('Permission not found');
    }catch(err){
        console.error('Error editing Permission:', err);
        throw err;
    }
}

//Remove Permission
async function removePermission(name) {
    try{
        const permission = await Permission.findOne({ where: { name_permission: name } });
        if(permission){
            await permission.destroy();
            return permission;
        }
        throw new Error('Permission not found');
    }catch(err){
        console.error('Error deleting Permission:', err);
        throw err;
    }
}

module.exports = { 
    insertPermission, 
    searchPermission, 
    searchPermissionName, 
    editPermission, 
    removePermission 
};
