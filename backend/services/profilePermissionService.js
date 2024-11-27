const ProfilePermission = require('../models/ProfilePermission');
const Permission = require('../models/Permission');
const Profile = require('../models/Profile')

//Insert association between Profile and Permission
async function insertProfilePermission(id_profile, id_permission) {
    try{
        const profilePermission = await ProfilePermission.create({ id_profile, id_permission });
        return profilePermission;
    }catch(err){
        console.error('Error inserting Profile Permission:', err);
        throw err;
    }
}

//Search for permissions associated with a Profile
async function searchPermissionsByProfile(id_profile) {
    try{
        const permissions = await Permission.findAll({
            include: {
                model: Profile,
                where: { id_profile },
                through: { attributes: [] },
            },
        });
        return permissions;
    }catch(err){
        console.error('Error fetching permissions for Profile:', err);
        throw err;
    }
}

//Search all Profiles with their permissions
async function searchAllProfilesWithPermissions() {
    try{
        const profiles = await Profile.findAll({
            include: {
                model: Permission,
                through: { attributes: [] },
            },
        });
        return profiles;
    }catch(err){
        console.error('Error fetching Profiles with Permissions:', err);
        throw err;
    }
}

//Remove permission from a Profile
async function removePermissionFromProfile(id_profile, id_permission) {
    try{
        const profilePermission = await ProfilePermission.findOne({ where: { id_profile, id_permission } });
        if (profilePermission) {
            await profilePermission.destroy();
            return profilePermission;
        }
        throw new Error('Profile Permission not found');
    }catch(err){
        console.error('Error removing Permission from Profile:', err);
        throw err;
    }
}

module.exports = {
    insertProfilePermission,
    searchPermissionsByProfile,
    searchAllProfilesWithPermissions,
    removePermissionFromProfile,
};
