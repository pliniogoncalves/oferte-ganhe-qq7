const userService = require('../services/userService.js');
const { hashPassword } = require('../services/authService.js');
const reportService = require('../services/reportService');

const userController = {
    
    // Function to register a new User
    insertUser: async (req, res) => {
        const { name, registration, email, password, profile, store } = req.body;

        try{
            // Hash the password before sending it to the service
            const hashedPassword = await hashPassword(password);

            // Call the service with the already hashed password
            const newUser = await userService.insertUser(name, registration, email, hashedPassword, profile, store);

            res.status(201).json({ message: 'User registered successfully!', user: newUser });
        }catch(erro){
            console.error('Error registering user:', erro);
            res.status(500).json({ message: 'Error registering user', erro: erro.message });
        }
    },

    //Function to Search All Users
    searchUser : async (req, res) => {
        try{
            const users = await userService.searchUser();
            res.status(200).json(users);
        }catch(err){
            res.status(500).json({ message: 'Error fetching all users', error: err.message });
        }
    },

    // Function to search for a user by registration number
    searchUserRegistration : async (req, res) => {
        const { registration } = req.params;

        try{
            const result = await userService.searchUserRegistration(registration);
            if(result){
                res.status(200).json(result);
            }else{
                res.status(404).json({ message: 'User not found' });
            }
        }catch(err) {
            res.status(500).json({ message: 'Error searching for user', error: err.message });
        }
    },

    // Function to edit an existing user
    editUser: async (req, res) => {
        const { registration } = req.params;
        const { name, newRegistration, email, password, profile, store } = req.body;

        try{
            let hashedPassword = password ? await hashPassword(password) : undefined;

            // Call the service to update the user
            const updatedUser = await userService.editUser(
                name,
                newRegistration,
                email,
                hashedPassword,
                profile,
                store,
                registration
            );

            if(updatedUser){
                res.status(200).json({ message: 'User updated successfully!', user: updatedUser });
            }else{
                res.status(404).json({ message: 'User not found.' });
            }
        }catch(erro){
            console.error('Error editing user:', erro);
            res.status(500).json({ message: 'Error editing user', error: erro.message });
        }
    },

    //Function to delete a user
    removeUser : async (req, res) => {
        const { registration } = req.params;

        try{
            const removedUser = await userService.removeUser(registration);
            if(removedUser){
                res.status(200).json({ message: 'User deleted successfully!', user: removedUser });
            }else{
                res.status(404).json({ message: 'User not found.' });
            }
        }catch(erro){
            res.status(500).json({ message: 'Error deleting user', error: erro.message });
        }
    },

    //Function export CSV
    exportUsersCSV: async (req, res) =>{
        try{
            const csvFilePath = await reportService.exportUsersReport();
            res.download(csvFilePath, 'usuarios.csv');
        }catch(error){
            console.error("Erro ao exportar CSV:", error);
            res.status(500).json({ message: 'Error exporting CSV', error: error.message });
        }
    },

    //Update password
    updatePassword: async (req, res) => {
        const  registration  = req.params.registration;
        const { currentPassword, newPassword } = req.body;

        try{
            if(!currentPassword || !newPassword) {
                return res.status(400).json({ error: 'All fields are required.' });
            }

            const hashedPassword = await hashPassword(newPassword);

            const result = await userService.updatePassword(registration, currentPassword, hashedPassword);

            return res.status(200).json(result);
        }catch(error){
            console.error('Error updating password:', error.message);
            return res.status(400).json({ error: error.message });
        }
    },
};

module.exports = userController;
