const Talon = require('../models/Talon');
const Store = require('../models/Store');
const User = require('../models/User');

//Function to insert a new Talon
async function insertTalon(storeId = 1, dateSend, userSend, quantity, status = 'Enviado') {
    try{
        const talon = await Talon.create({
            id_store: storeId,
            date_send: dateSend,
            user_send: userSend,
            quantity_talon: quantity,
            status_talon: status,
        });
        return talon;
    }catch(err){
        console.error('Error inserting talon:', err);
        throw err;
    }
}

//Function to search for all Talons
async function searchTalons() {
    try{
        const talons = await Talon.findAll({
            include: [
                { 
                    model: Store, 
                    attributes: ['name_store','number_store'], 
                    required: false 
                },
                { 
                    model: User, as: 'Sender', 
                    attributes: ['name_users'], 
                    required: false 
                },
                { model: User, as: 'Receiver', 
                    attributes: ['name_users'], 
                    required: false 
                },
            ],
        });
        return talons;
    }catch(err){
        console.error('Error fetching talons:', err);
        throw err;
    }
}

//Function to search for Talon by ID
async function searchTalonId(talonId) {
    try{
        const talon = await Talon.findOne({
            where: { id_talon: talonId },
            include: [
                { model: Store, attributes: ['name_store'], required: false },
                { model: User, as: 'Sender', attributes: ['name_users'], required: false },
                { model: User, as: 'Receiver', attributes: ['name_users'], required: false },
            ],
        });
        return talon;
    }catch(err){
        console.error('Error fetching talon by ID:', err);
        throw err;
    }
}

//Function to update a Talon
async function updateTalon(talonId, dateReceived, userReceived, status = 'Recebido') {
    try{
        const talon = await Talon.update(
            { 
                date_received: dateReceived, 
                user_received: userReceived, 
                status_talon: status 
            },
            { 
                where: { id_talon: talonId }, 
                returning: true 
            }
        );

        return talon[1][0];
    }catch(err){
        console.error('Error updating talon:', err);
        throw err;
    }
}

//Function to remove a Talon
async function removeTalon(talonId) {
    try{
        const talon = await Talon.destroy({
            where: { id_talon: talonId },
        });
        return talon;
    }catch(err){
        console.error('Error deleting talon:', err);
        throw err;
    }
}

//Function counts all talons
async function countTalons() {
    try {
        const count = await Talon.count();
        return count;
    } catch (err) {
        console.error('Error counting talons:', err);
        throw err;
    }
}

module.exports = {
    insertTalon,
    searchTalons,
    searchTalonId,
    updateTalon,
    removeTalon,
    countTalons
};
