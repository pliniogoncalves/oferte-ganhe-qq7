const stockService = require('../services/stockService.js');

//Controller for the Stock page
const stockController = {

    //Function to register a new stock
    insertStock: async (req, res) => {
        const { storeId, talonId, currentStock, minStock, recommendedStock } = req.body;

        try{
            const stockStatus = await stockService.calculateStockStatus(currentStock, minStock, recommendedStock);

            const newStock = await stockService.insertStock(
                storeId, 
                talonId, 
                currentStock, 
                minStock, 
                recommendedStock, 
                stockStatus
            );

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

    //Function to edit a stock record
    editStock: async (req, res) => {
        try{
            const stockId = req.params.id;
            const { talonId, currentStock, minStock, recommendedStock } = req.body;
    
            if(!stockId || !currentStock || !minStock || !recommendedStock) {
                return res.status(400).json({
                    message: 'Parâmetros obrigatórios ausentes. Certifique-se de enviar stockId, storeId, currentStock, minStock e recommendedStock.',
                });
            }
    
            const stock = await stockService.searchStockById(stockId);
            if(!stock){
                return res.status(404).json({ message: `Estoque com ID ${stockId} não encontrado.` });
            }
    
            const parsedCurrentStock = parseFloat(currentStock);
            const parsedMinStock = parseFloat(minStock);
            const parsedRecommendedStock = parseFloat(recommendedStock);
    
            const updatedStock = await stockService.editStock(
                stockId,
                talonId,
                parsedCurrentStock,
                parsedMinStock,
                parsedRecommendedStock,
            );
    
            if(!updatedStock){
                return res.status(500).json({ message: 'Falha ao atualizar o estoque. Verifique os dados enviados.' });
            }
    
            res.status(200).json({
                message: 'Registro de estoque atualizado com sucesso!',
                stock: updatedStock,
            });
        }catch(err){
            console.error('Erro ao atualizar o registro de estoque:', err.message);
            res.status(500).json({
                message: 'Erro ao atualizar o registro de estoque.',
                error: err.message,
            });
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

    // Função para buscar os stocks com paginação
    getPaginatedStocks: async (req, res) => {
    const { offset, limit } = req.query; // Pega os parâmetros da requisição (offset e limit)
    
    try {
        // Chama o serviço de paginar os stocks
        const stocks = await stockService.getPaginatedStocks(offset, limit);
        
        // Verifica se encontrou stocks
        if (stocks && stocks.length > 0) {
            res.status(200).json({ message: 'Stocks retrieved successfully', stocks });
        } else {
            res.status(404).json({ message: 'No stocks found' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Error fetching stocks', error: err.message });
    }
},

};

module.exports = stockController;