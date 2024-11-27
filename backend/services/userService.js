const Profile = require('../models/Profile');
const Store = require('../models/Store');
const User = require('../models/User');

//Insert new user
async function insertUser(name, registration, email, password, profile = '1', store = '1') {
    try{
        const user = await User.create({
            name_users: name,
            registration_users: registration,
            email_users: email,
            password_users: password,
            id_profile: profile,
            id_store: store,
        });

        return user;
    }catch(err){
        console.error('Error inserting user:', err);
        throw err;
    }
}

//Query all users
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

//Query user by record
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

//Edit user
async function editUser(name, newRegistration, email, password, profile, store, registration) {
    try{
        const [affectedRows, [updatedUser]] = await User.update(
            {
                name_users: name,
                registration_users: newRegistration,
                email_users: email,
                password_users: password,
                id_profile: profile,
                id_store: store,
            },
            {
                where: { registration_users: registration },
                returning: true,
            }
        );

        return updatedUser;
    }catch(err){
        console.error('Error editing user:', err);
        throw err;
    }
}

//Remove user
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
