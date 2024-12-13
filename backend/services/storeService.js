const Store = require('../models/Store');
const stockService = require('./stockService');

//Function to insert a new store
async function insertStore(name, number) {
    try{
        const newStore = await Store.create({
            name_store: name,
            number_store: number,
        });

        await stockService.insertStock(
            newStore.id_store,
            null,              
            0,                 
            0,                 
            0,                 
            'active'           
        );
        
        return newStore;
    }catch(err){
        console.error('Error inserting store:', err);
        throw err;
    }
}

//Function to search for all stores
async function searchStore() {
    try{
        const stores = await Store.findAll();
        return stores;
    }catch(err){
        console.error('Error when querying stores:', err);
        throw err;
    }
}

//Function to search for store by number
async function searchStoreNumber(number) {
    try{
        const store = await Store.findOne({
            where: { number_store: number },
        });
        return store;
    }catch(err){
        console.error('Error searching store by number:', err);
        throw err;
    }
}

//Function to edit a store
async function editStore(name, newNumber, number) {
    try{
        const updatedStore = await Store.update(
            { name_store: name, number_store: newNumber },
            { where: { number_store: number }, returning: true }
        );
        return updatedStore[1][0];
    }catch(err){
        console.error('Error editing store:', err);
        throw err;
    }
}

//Function to remove a store
async function removeStore(number) {
    try{
        const deletedStore = await Store.destroy({
            where: { number_store: number },
        });
        return deletedStore;
    }catch(err){
        console.error('Error deleting store:', err);
        throw err;
    }
}

//Function counts all stores
async function countStores() {
    try {
        const count = await Store.count();
        return count;
    } catch (err) {
        console.error('Error counting Stores:', err);
        throw err;
    }
}

//Function to fetch paginated stores
async function getPaginatedStores(offset, limit) {
    try{
        const stores = await Store.findAll({
            offset,
            limit,
            order: [['id_store', 'ASC']],
        });
        return stores;
    }catch(err){
        console.error('Error fetching paginated stores:', err);
        throw err;
    }
}

module.exports = {
    insertStore,
    searchStore,
    searchStoreNumber,
    editStore,
    removeStore,
    countStores,
    getPaginatedStores
};