const stockService = require('../services/stockService.js');

//Controller for the Stock page
const stockController = {

    //Function to register a new stock
    insertStock: async (req, res) => {
        const { storeId, talonId, currentStock, minStock, recommendedStock, stockStatus } = req.body;
    
        try{
            const newStock = await stockService.insertStock(storeId, talonId, currentStock, minStock, recommendedStock, stockStatus);
            res.status(201).json({ message: 'Stock record created successfully!', stock: newStock });
        }catch(err){
            res.status(500).json({ message: 'Error creating stock record', error: err.message });
        }
    },

    //Function to search for all stock records
    searchStocks: async (req, res) => {
        try{
            const stocks = await stockService.searchStocks();
            res.status(200).json(stocks);
        }catch(err){
            res.status(500).json({ message: 'Error fetching stock records', error: err.message });
        }
    },

    //Function to search for a stock record by ID
    searchStockById: async (req, res) => {
        const { id } = req.params;
    
        try{
            const stock = await stockService.searchStockById(id);
            if(stock){
                res.status(200).json(stock);
            }else{
                res.status(404).json({ message: 'Stock record not found' });
            }
        }catch(err){
            res.status(500).json({ message: 'Error fetching stock record', error: err.message });
        }
    },

    //Function to search for a stock record by ID Store
    searchStockByStoreId: async (req, res) => {
        const { id } = req.params;
    
        try{
            const stock = await stockService.searchStockByStoreId(id);
            if(stock){
                res.status(200).json(stock);
            }else{
                res.status(404).json({ message: 'Stock record not found' });
            }
        }catch(err){
            res.status(500).json({ message: 'Error fetching stock record', error: err.message });
        }
    },

    //Function to edit a stock record
    editStock: async (req, res) => {
        const { id } = req.params;
        const { storeId, talonId, currentStock, minStock, recommendedStock } = req.body;
    
        try{
            
            const stockStatus = stockService.calculateStockStatus(currentStock, minStock, recommendedStock);

            let updatedStock;

            if(!id || id === 'null'){
                updatedStock = await stockService.insertStock({
                    storeId,
                    talonId,
                    currentStock,
                    minStock,
                    recommendedStock,
                    stockStatus
                });
            }else{
                updatedStock = await stockService.editStock(id, storeId, talonId, currentStock, minStock, recommendedStock, stockStatus);
            }
            
            if(updatedStock){
                res.status(200).json({ message: 'Stock record updated successfully!', stock: updatedStock });
            }else{
                res.status(404).json({ message: 'Stock record not found' });
            }
        }catch(err){
            res.status(500).json({ message: 'Error updating stock record', error: err.message });
        }
    },

    //Function to delete a stock record
    removeStock: async (req, res) => {
        const { id } = req.params;
    
        try{
            const removedStock = await stockService.removeStock(id);
            if(removedStock){
                res.status(200).json({ message: 'Stock record deleted successfully!', stock: removedStock });
            }else{
                res.status(404).json({ message: 'Stock record not found' });
            }
        }catch(err){
            res.status(500).json({ message: 'Error deleting stock record', error: err.message });
        }
    },
};

module.exports = stockController;