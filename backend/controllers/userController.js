const userService = require('../services/userService.js')

//Controller for the users page
const userController = {
    //Function to display the user page
    getUserPage: (req, res) => {
        res.send("Página dos Usuários");
    },

    //Function to register a new User
    insertUser: async (req, res) => {
        const {name, registration, email, password, profile, store} = req.body;

        try{
            const newUser = await userService.insertUser(name, registration, email, password, profile, store);
            res.status(201).json({ message: 'User registered successfully!', user: newUser});
        }catch(erro){
            res.status(500).json({ message: 'Error registering user', erro: erro.message});
        }
    },

    //Function to Search All Users
    searchUser : async (req, res) => {
        try {
            const users = await userService.searchUser();
            res.status(200).json(users);
        }catch(err){
            res.status(500).json({ message: 'Error fetching all users', error: err.message });
        }
    },

    // Function to search for a user by registration number
    searchUserMatricula : async (req, res) => {
        const { registration } = req.params;

        try {
            const result = await userService.searchUserMatricula(registration);
            if(result){
                res.status(200).json(result);
            }else{
                res.status(404).json({ message: 'User not found' });
            }
        }catch(err) {
            res.status(500).json({ message: 'Error searching for user', error: err.message });
        }
    },

    // Função para editar um usuário existente
    editUser : async (req, res) =>{
        const { registration } = req.params;
        const { name, newRegistration, email, password, profile, store } = req.body;

        try{
            const updateUser = await userService.editUser(name, newRegistration, email, password, profile, store, registration);
            if (updateUser) {
                res.status(200).json({ message: 'User updated successfully!', user: updateUser });
            }else{
                res.status(404).json({ message: 'User not found.' });
            }
        }catch(erro){
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
    }
};

module.exports = userController;
