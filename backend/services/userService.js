const Profile = require('../models/Profile');
const Store = require('../models/Store');
const User = require('../models/User');
const bcrypt = require('bcrypt');

//Funcition Insert new user
async function insertUser(name, registration, email, password, profileName = 1, storeNumber = 1) {
    try{
        let idProfile = 1;
        let idStore = 1;

        if(profileName){
            const foundProfile = await Profile.findOne({
                where: { name_profile: profileName },
            });
            if(foundProfile){
                idProfile = foundProfile.id_profile;

                if(profileName.toLowerCase() === 'Administrador'){
                    storeNumber = '0';
                }

            }else{
                throw new Error(`Profile with name '${profileName}' not found.`);
            }
        }

        if(storeNumber){
            storeNumber = storeNumber.toString();
            const foundStore = await Store.findOne({
                where: { number_store: storeNumber },
            });
            if (foundStore) {
                idStore = foundStore.id_store;
            }else{
                throw new Error(`Store with number '${storeNumber}' not found.`);
            }
        }

        const user = await User.create({
            name_users: name,
            registration_users: registration,
            email_users: email,
            password_users: password,
            id_profile: idProfile,
            id_store: idStore,
        });

        return user;
    }catch(err){
        console.error('Error inserting user:', err);
        throw err;
    }
}


//Function search all users
async function searchUser() {
    try{
        const users = await User.findAll({
            include: [
                { model: Profile, as: 'profile', attributes: ['name_profile'] },
                { model: Store, as: 'store', attributes: ['number_store'] },
            ],
        });

        return users;
    }catch(err){
        console.error('Error querying user:', err);
        throw err;
    }
}

//Function search user by registration
async function searchUserRegistration(registration) {
    try{
        const user = await User.findOne({
            where: { registration_users: registration },
            include: [
                { model: Profile, as: 'profile', attributes: ['name_profile'] },
                { model: Store, as: 'store', attributes: ['number_store'] },
            ],
        });

        return user;
    }catch(err){
        console.error('Error searching user by registration:', err);
        throw err;
    }
}

//function Edit user
async function editUser(name, newRegistration, email, password, profile, store, registration) {

    try{
        const foundProfile = await Profile.findOne({
            where: { name_profile: profile },
        });

        if(!foundProfile){
            throw new Error(`Profile with name '${profile}' not found`);
        }

        let storeNumber = store.toString();
        if(profile.toLowerCase() === 'Administrador') {
            storeNumber = '0';
        }

        const foundStore = await Store.findOne({
            where: { number_store: store },
        });

        if(!foundStore){
            throw new Error(`Store with number '${store}' not found`);
        }

        const updateFields = {
            ...(name && { name_users: name }),
            ...(newRegistration && { registration_users: newRegistration }),
            ...(email && { email_users: email }),
            ...(password && { password_users: password }),
            id_profile: foundProfile.id_profile,
            id_store: foundStore.id_store,      
        };

        const [affectedRows, [updatedUser]] = await User.update(
            updateFields,
            {
                where: { registration_users: registration },
                returning: true,
            }
        );

        if(affectedRows === 0){
            throw new Error(`User with registration '${registration}' not found`);
        }

        console.log('User updated:', updatedUser);
        return updatedUser;
    }catch (err){
        console.error('Error editing user:', err.message);
        throw err;
    }
}

//Function Remove user
async function removeUser(registration) {
    try{
        const user = await User.destroy({
            where: { registration_users: registration },
        });

        return user;
    }catch(err){
        console.error('Error deleting user:', err);
        throw err;
    }
}

//Function counts all users
async function countUsers() {
    try {
        const count = await User.count();
        return count;
    } catch (err) {
        console.error('Error counting users:', err);
        throw err;
    }
}

//function update password
async function updatePassword(registration, currentPassword, newPassword) {
    const user = await User.findOne({ where: { registration_users: registration } });
    if(!user) throw new Error('User not found.');

    const isMatch = await bcrypt.compare(currentPassword, user.password_users);
    if (!isMatch) throw new Error('Current password is incorrect.');

    user.password_users = newPassword;
    await user.save();

    return { message: 'Password updated successfully.' };
}


module.exports = {
    insertUser,
    searchUser,
    searchUserRegistration,
    editUser,
    removeUser,
    countUsers,
    updatePassword
};
