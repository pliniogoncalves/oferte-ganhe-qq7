const Stock = require('../models/Stock');
const Store = require('../models/Store');
const Talon = require('../models/Talon');

// Function to insert a new stock
async function insertStock(storeId, talonId, currentStock, minStock, recommendedStock, stockStatus) {
    try{
        const stock = await Stock.create({
            id_store: storeId,
            id_talon: talonId || null,
            current_stock: currentStock,
            minimum_stock: minStock,
            recommended_stock: recommendedStock,
            status_stock: stockStatus,
        });
        return stock;
    }catch(err){
        console.error('Error inserting stock:', err);
        throw err;
    }
}

//Function to search for all stocks
async function searchStocks() {
    try{
        const stocks = await Stock.findAll({
            include: [
                { 
                    model: Store, 
                    attributes: ['name_store', 'number_store'], 
                    required: false 
                },
                { 
                    model: Talon, 
                    attributes: ['status_talon'], 
                    required: false 
                },
            ],
        });
        return stocks.map(stock => ({
            ...stock.toJSON(),
            Store: stock.Store || { name_store: 'Sem loja associada', number_store: 'Sem loja' },
        }));
    }catch(err){
        console.error('Error fetching stocks:', err);
        throw err;
    }
}

//Function to search for a stock by ID
async function searchStockById(stockId) {
    
    if (!stockId) {
        throw new Error("ID do estoque não pode ser vazio ou indefinido.");
    }

    try{
        const stock = await Stock.findOne({
            where: { id_stock: stockId },
            include: [
                { model: Store, 
                    attributes: ['name_store', 'number_store'], 
                    required: false, 
                },
                { model: Talon, 
                    attributes: ['status_talon'], 
                    required: false 
                },
            ],
        });
        
        if (!stock) {
            throw new Error(`Estoque não encontrado para a loja com número: ${stockId}`);
        }

        return stock;
    }catch(err){
        console.error('Error fetching stock by ID:', err);
        throw err;
    }
}

async function searchStockByStoreNumber(storeNumber) {
    try {
        const stock = await Stock.findOne({
            include: [
                {
                    model: Store,
                    attributes: ['name_store', 'number_store'],
                    where: { number_store: storeNumber },
                    required: true,
                },
                {
                    model: Talon,
                    attributes: ['status_talon'],
                    required: false,
                },
            ],
        });

        if (!stock) {
            throw new Error(`Estoque não encontrado para a loja com número: ${storeNumber}`);
        }

        return stock;
    } catch (err) {
        console.error('Error fetching stock by store number:', err);
        throw err;
    }
}


//Function to update a stock
async function editStock(stockId, talonId, currentStock, minStock, recommendedStock) {
    const stockStatus = await calculateStockStatus(currentStock, minStock, recommendedStock)
    try {
        const stock = await Stock.update(
            {  
                id_talon: talonId || null, 
                current_stock: currentStock, 
                minimum_stock: minStock, 
                recommended_stock: recommendedStock, 
                status_stock: stockStatus 
            },
            { 
                where: { id_stock: stockId }, 
                returning: true 
            }
        );
        return stock[1][0];
    }catch(err){
        console.error('Error updating stock:', err);
        throw err;
    }
}

//Function to delete a stock
async function removeStock(stockId) {
    try{
        const stock = await Stock.destroy({
            where: { id_stock: stockId },
        });
        return stock;
    }catch(err){
        console.error('Error deleting stock:', err);
        throw err;
    }
}

//Function counts all Stocks
async function countStocks() {
    try{
        const count = await Stock.count();
        return count;
    }catch(err){
        console.error('Error counting profiles:', err);
        throw err;
    }
}

//Function to fetch paginated stocks
async function getPaginatedStocks(offset, limit) {
    try{
        const stocks = await Stock.findAll({
            offset: Number(offset),
            limit: Number(limit),
            order: [['id_stock', 'ASC']],
            include: [
                {
                    model: Store,
                    attributes: ['name_store', 'number_store'],
                    required: false,
                },
                {
                    model: Talon,
                    attributes: ['status_talon'],
                    required: false,
                },
            ],
        });
        return stocks;
    }catch(err){
        console.error('Error fetching paginated stocks:', err);
        throw err;
    }
}

async function calculateStockStatus(currentStock, minStock, recommendedStock) {
    if (currentStock <= minStock) return 'Baixo';
    if (currentStock > minStock && currentStock <= recommendedStock) return 'Médio';
    return 'Ok';
}

module.exports = { 
    insertStock, 
    searchStocks, 
    searchStockById,
    searchStockByStoreNumber, 
    editStock, 
    removeStock,
    countStocks,
    getPaginatedStocks,
    calculateStockStatus 
};
