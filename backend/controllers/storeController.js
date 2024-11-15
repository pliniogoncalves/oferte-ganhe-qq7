const storeService = require('../services/storeService.js')

//Controller for the Stores page
const storeController = {
    
    getStorePage: (req, res) => {
        res.send("Página das Lojas");
    },

    //Function to register a new Store
    insertStore: async (req, res) => {
        const {name, number} = req.body;

        try{
            const newStore = await storeService.insertStore(name, number);
            res.status(201).json({ message: 'Store registered successfully!', store: newStore});
        }catch(erro){
            res.status(500).json({ message: 'Error registering Store', erro: erro.message});
        }
    },

    //Function to Search All Stores
    searchStore: async (req, res) => {
        try{
            const store = await storeService.searchStore();
            res.status(200).json(store);
        }catch(err){
            res.status(500).json({ message: 'Error fetching all stores', error: err.message });
        }
    },

    //Function to find a store by number
    searchStoreNumber: async (req, res) => {
        const { number } = req.params;

        try{
            const result = await storeService.searchStoreNumber(number);
            if(result){
                res.status(200).json(result);
            }else{
                res.status(404).json({ message: 'Store not found' });
            }
        }catch(err){
            res.status(500).json({ message: 'Error searching for store', error: err.message });
        }
    },

    // Function to edit an existing store
    editStore: async (req, res) =>{
        const { number } = req.params;
        const { name, newNumber } = req.body;

        try{
            const updateStore = await storeService.editStore(name, newNumber, number);
            if(updateStore){
                res.status(200).json({ message: 'Store updated successfully!', store: updateStore });
            }else{
                res.status(404).json({ message: 'Store not found.' });
            }
        }catch(err){
            res.status(500).json({ message: 'Error editing Store', error: err.message });
        }
    },

    //Function to delete a store
    removeStore: async (req, res) => {
        const { number } = req.params;

        try{
            const removedStore = await storeService.removeStore(number);
            if(removedStore){
                res.status(200).json({ message: 'Store deleted successfully!', store: removedStore });
            }else{
                res.status(404).json({ message: 'Store not found.' });
            }
        }catch(err){
            res.status(500).json({ message: 'Error deleting Store', error: err.message });
        }
    },
};

module.exports = storeController;