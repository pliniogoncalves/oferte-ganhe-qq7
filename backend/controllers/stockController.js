const stockService = require('../services/stockService.js');

//Controller for the Stock page
const stockController = {

    //Function to register a new stock
    
    insertStock: async (req, res) => {
        const { storeId, talonId, currentStock, minStock, recommendedStock } = req.body;

        try {
            console.log('Requisição recebida no insertStock:', req.body);

            if (!storeId || currentStock === undefined || minStock === undefined || recommendedStock === undefined) {
                return res.status(400).json({ message: 'Missing required fields' });
            }

            const stockStatus = await stockService.calculateStockStatus(currentStock, minStock, recommendedStock);
            console.log('Status calculado para o estoque:', stockStatus);

            const newStock = await stockService.insertStock(storeId, talonId, currentStock, minStock, recommendedStock, stockStatus);
            console.log('Novo estoque criado:', newStock);

            res.status(201).json({ message: 'Stock record created successfully!', stock: newStock });
        } catch (err) {
            console.error('Error creating stock:', err);
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
        const { stockId, storeId, talonId, currentStock, minStock, recommendedStock } = req.body;

        try {
            console.log('Dados recebidos no editStock:', req.body);

            if (typeof stockId !== 'number' && typeof stockId !== 'string') {
                console.error('Erro: stockId não é um número ou string válido:', stockId);
            }

            const parsedCurrentStock = parseFloat(currentStock);
            const parsedMinStock = parseFloat(minStock);
            const parsedRecommendedStock = parseFloat(recommendedStock);

            const stockStatus = await stockService.calculateStockStatus(parsedCurrentStock, parsedMinStock, parsedRecommendedStock);
            console.log('Status calculado no editStock:', stockStatus);

            const updatedStock = await stockService.saveStock(
                stockId,
                storeId,
                talonId,
                parsedCurrentStock,
                parsedMinStock,
                parsedRecommendedStock,
                stockStatus
            );
            console.log('Estoque atualizado:', updatedStock);

            res.status(200).json({ message: 'Stock record updated successfully!', stock: updatedStock });
        } catch (err) {
            console.error('Error updating stock record:', err);
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