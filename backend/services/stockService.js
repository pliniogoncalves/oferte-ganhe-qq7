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
                    required: false },
            ],
        });
        return stocks;
    }catch(err){
        console.error('Error fetching stocks:', err);
        throw err;
    }
}

//Function to search for a stock by ID
async function searchStockById(stockId) {
    try{
        const stock = await Stock.findOne({
            where: { id_stock: stockId },
            include: [
                { model: Store, attributes: ['name_store'], required: false },
                { model: Talon, attributes: ['status_talon'], required: false },
            ],
        });
        return stock;
    }catch(err){
        console.error('Error fetching stock by ID:', err);
        throw err;
    }
}

async function searchStockByStoreId(storeId) {
    try {
        console.log('Buscando estoque pelo Store ID:', storeId);

        const stock = await Stock.findOne({
            where: { id_store: storeId },
            include: [
                { model: Store, attributes: ['name_store', 'number_store'], required: false },
                { model: Talon, attributes: ['id_talon'], required: false },
            ],
        });

        console.log('Resultado da busca de estoque:', stock);
        return stock;
    } catch (err) {
        console.error('Erro ao buscar estoque pelo Store ID:', err);
        throw err;
    }
}

//Function to update a stock
async function editStock(stockId, storeId, talonId, currentStock, minStock, recommendedStock, stockStatus) {
    try {
        const stock = await Stock.update(
            { 
                id_store: storeId, 
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

async function saveStock(stockId, storeId, talonId, currentStock, minStock, recommendedStock, stockStatus) {
    try {
        console.log('Dados recebidos no saveStock:', { stockId, storeId, talonId, currentStock, minStock, recommendedStock, stockStatus });

        if (stockId) {
            console.log('Verificando tipo de stockId antes do update:', { stockId, type: typeof stockId });

            const updatedStock = await Stock.update(
                { id_store: storeId, id_talon: talonId || null, current_stock: currentStock, minimum_stock: minStock, recommended_stock: recommendedStock, status_stock: stockStatus },
                { where: { id_stock: stockId }, returning: true }
            );

            console.log('Estoque atualizado com sucesso:', updatedStock[1][0]);
            return updatedStock[1][0];
        } else {
            console.log('Criando novo estoque...');
            const newStock = await Stock.create({
                id_store: storeId,
                id_talon: talonId || null,
                current_stock: currentStock,
                minimum_stock: minStock,
                recommended_stock: recommendedStock,
                status_stock: stockStatus,
            });

            console.log('Novo estoque criado com sucesso:', newStock);
            return newStock;
        }
    } catch (err) {
        console.error('Erro no saveStock:', err);
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
    searchStockByStoreId, 
    editStock, 
    removeStock,
    countStocks,
    saveStock,
    calculateStockStatus 
};
