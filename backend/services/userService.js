const Profile = require('../models/Profile');
const Store = require('../models/Store');
const User = require('../models/User');

//Funcition Insert new user
async function insertUser(name, registration, email, password, profileName = null, storeNumber = null) {
    try{
        let idProfile = 1;
        let idStore = 1;

        //Fetch profile ID based on name
        if(profileName){
            const foundProfile = await Profile.findOne({
                where: { name_profile: profileName },
            });
            if(foundProfile){
                idProfile = foundProfile.id;
            }else{
                console.warn(`Profile with name '${profileName}' not found. Using default.`);
            }
        }

        //Fetch store ID based on number
        if(storeNumber){
            const foundStore = await Store.findOne({
                where: { number_store: storeNumber },
            });
            if (foundStore) {
                idStore = foundStore.id;
            }else{
                console.warn(`Store with number '${storeNumber}' not found. Using default.`);
            }
        }

        //Insert new user
        const user = await User.create({
            name_users: name,
            registration_users: registration,
            email_users: email,
            password_users: password,
            id_profile: idProfile,
            id_store: idStore,
        });

        return user;
    } catch (err) {
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
    console.log('Editing user:', { name, newRegistration, email, profile, store, registration });

   //Fetch profile ID based on name
    const foundProfile = await Profile.findOne({
        where: { name_profile: profile },
    });

    if(!foundProfile){
        throw new Error(`Profile with name '${profile}' not found`);
    }

    //Fetch store ID based on number
    const foundStore = await Store.findOne({
        where: { number_store: store },
    });

    if(!foundStore) {
        throw new Error(`Store with number '${store}' not found`);
    }

    //Build dynamic fields for update
    const updateFields = {
        ...(name && { name_users: name }),
        ...(newRegistration && { registration_users: newRegistration }),
        ...(email && { email_users: email }),
        ...(password && { password_users: password }),
        id_profile: foundProfile.id,
        id_store: foundStore.id,
    }; 

    try{
        const [affectedRows, [updatedUser]] = await User.update(
            updateFields,
            {
                where: { registration_users: registration },
                returning: true,
            }
        );

        console.log('User updated:', updatedUser);
        return updatedUser;
    } catch (err) {
        console.error('Error editing user:', err);
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

module.exports = {
    insertUser,
    searchUser,
    searchUserRegistration,
    editUser,
    removeUser,
};
