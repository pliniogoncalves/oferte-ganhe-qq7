const ProfilePermission = require('../models/ProfilePermission');
const Permission = require('../models/Permission');
const Profile = require('../models/Profile');

//Insert association between Profile and Permission by name
async function insertProfilePermission(profileName, permissionName) {
    try{
        //Search for profile ID by name
        const profile = await Profile.findOne({ where: { name_profile: profileName } });
        if (!profile) {
            throw new Error(`Profile with name '${profileName}' not found`);
        }

        //Search for permission ID by name
        const permission = await Permission.findOne({ where: { name_permission: permissionName } });
        if(!permission){
            throw new Error(`Permission with name '${permissionName}' not found`);
        }

        //Insert the association
        const profilePermission = await ProfilePermission.create({ 
            id_profile: profile.id_profile, 
            id_permission: permission.id_permission 
        });
        return profilePermission;
    }catch(err){
        console.error('Error inserting Profile Permission:', err);
        throw err;
    }
}

//Search for permissions associated with a Profile by name
async function searchPermissionsByProfile(profileName) {
    try{
        //Search for profile ID by name
        const profile = await Profile.findOne({ 
            where: { name_profile: profileName },
            include: [
                {
                    model: Permission,
                    required: false,
                    through: { attributes: [] },
                },
            ],
         });

        if(!profile){
            throw new Error(`Profile with name '${profileName}' not found`);
        }

        //Fetch associated permissions
        const result = {
            name_profile: profile.name_profile,
            permissions: profile.Permissions.map(permission => ({
                id_permission: permission.id_permission,
                name_permission: permission.name_permission,
            })),
        };

        return result;
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
        return profiles.map(profile => ({
            id_profile: profile.id_profile,
            name_profile: profile.name_profile,
            Permissions: profile.Permissions.map(permission => ({
                id_permission: permission.id_permission,
                name_permission: permission.name_permission,
            })) || [],
        }));
    }catch(err){
        console.error('Error fetching Profiles with Permissions:', err);
        throw err;
    }
}

//Remove permission from a Profile by name
async function removePermissionFromProfile(profileName, permissionName) {
    try{
        //Search for profile ID by name
        const profile = await Profile.findOne({ where: { name_profile: profileName } });
        if(!profile){
            throw new Error(`Profile with name '${profileName}' not found`);
        }

        //Search for permission ID by name
        const permission = await Permission.findOne({ where: { name_permission: permissionName } });
        if(!permission){
            throw new Error(`Permission with name '${permissionName}' not found`);
        }

        //Remove the association
        const profilePermission = await ProfilePermission.findOne({ 
            where: { 
                id_profile: profile.id_profile, 
                id_permission: permission.id_permission 
            } 
        });
        if (profilePermission) {
            await profilePermission.destroy();
            return profilePermission;
        }
        throw new Error('Profile Permission not found');
    } catch (err) {
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
