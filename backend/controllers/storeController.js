const storeService = require('../services/storeService.js')
const reportService = require('../services/reportService');

//Controller for the Stores page
const storeController = {

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

    //Function export CSV
    exportStoresCSV: async (req, res) =>{
        try{
            const csvFilePath = await reportService.exportStoresReport();
            res.download(csvFilePath, 'lojas.csv');
        }catch(error){
            console.error("Erro ao exportar CSV:", error);
            res.status(500).json({ message: 'Error exporting CSV', error: error.message });
        }
    },

    // Function to get paginated stores
    getPaginatedStores: async (req, res) => {
        const{ page, itemsPerPage } = req.query;

        try{
            const currentPage = parseInt(page, 10) || 1;
            const limit = parseInt(itemsPerPage, 10) || 10;
            const offset = (currentPage - 1) * limit;
    
            const totalItems = await storeService.countStores();
            const stores = await storeService.getPaginatedStores(offset, limit);
            const totalPages = Math.ceil(totalItems / limit);
    
            if(stores.length > 0){
                res.status(200).json({
                    message: 'Stores retrieved successfully!',
                    stores,
                    pagination: {
                        currentPage,
                        itemsPerPage: limit,
                        totalPages,
                        totalItems,
                    },
                });
            }else{
                res.status(404).json({
                    message: 'No stores found.',
                    stores: [],
                    pagination: {
                        currentPage,
                        itemsPerPage: limit,
                        totalPages: 0,
                        totalItems: 0,
                    },
                });
            }
        }catch(err){
            console.error('Error fetching paginated stores:', err.message);
            res.status(500).json({ message: 'Error fetching paginated stores.', error: err.message });
        }
    },  
};

module.exports = storeController;