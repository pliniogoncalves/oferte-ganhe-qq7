const talonService = require('../services/talonService.js');

// Controller for the Talon page
const talonController = {

    // Function to register a new Talon
    insertTalon: async (req, res) => {
        const { storeId, dateSend, userSend, quantity, status } = req.body;
    
        try{
            const newTalon = await talonService.insertTalon(storeId, dateSend, userSend, quantity, status);
            res.status(201).json({ message: 'Talon created successfully!', talon: newTalon });
        }catch(err){
            res.status(500).json({ message: 'Error creating talon', error: err.message });
        }
    },

    // Function to search for all Talons
    searchTalons: async (req, res) => {
        try{
            const talons = await talonService.searchTalons();
            res.status(200).json(talons);
        }catch(err){
            res.status(500).json({ message: 'Error fetching talons', error: err.message });
        }
    },

    //Function to search for Talon by ID
    searchTalonId: async (req, res) => {
        const { id } = req.params;
    
        try{
            const talon = await talonService.searchTalonId(id);
            if(talon){
                res.status(200).json(talon);
            }else{
                res.status(404).json({ message: 'Talon not found' });
            }
        }catch(err){
            res.status(500).json({ message: 'Error fetching talon', error: err.message });
        }
    },

    //Function to update a Talon
    updateTalon: async (req, res) => {
        const { id } = req.params;
        const { dateReceived, userReceived, status } = req.body;
    
        try{
            const updatedTalon = await talonService.updateTalon(id, dateReceived, userReceived, status);
            if(updatedTalon){
                res.status(200).json({ message: 'Talon updated successfully!', talon: updatedTalon });
            }else{
                res.status(404).json({ message: 'Talon not found' });
            }
        }catch(err){
            res.status(500).json({ message: 'Error updating talon', error: err.message });
        }
    },

    // Function to remove a stub
    removeTalon: async (req, res) => {
        const { id } = req.params;
    
        try{
            const deletedTalon = await talonService.removeTalon(id);
            if(deletedTalon){
                res.status(200).json({ message: 'Talon deleted successfully!', talon: deletedTalon });
            }else{
                res.status(404).json({ message: 'Talon not found' });
            }
        }catch(err){
        res.status(500).json({ message: 'Error deleting talon', error: err.message });
        }
    },

};

module.exports = talonController;
