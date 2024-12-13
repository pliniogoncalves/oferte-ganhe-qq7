const talonService = require('../services/talonService.js');
const reportService = require('../services/reportService');

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

    //Function to edit a Talon
    editTalon: async (req, res) => {
        const { id } = req.params;
        const { storeId, dateSend, userSend, quantity, status } = req.body;
    
        try{
            const updatedTalon = await talonService.editTalon(id, storeId, dateSend, userSend, quantity, status);
            if(updatedTalon){
                res.status(200).json({ message: 'Talon edited successfully!', talon: updatedTalon });
            }else{
                res.status(404).json({ message: 'Talon not found' });
            }
        }catch(err){
            res.status(500).json({ message: 'Error edit talon', error: err.message });
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

    //Function export CSV
    exportTalonsCSV: async (req, res) =>{
        try{
            const csvFilePath = await reportService.exportTalonsReport();
            res.download(csvFilePath, 'taloes.csv');
        }catch(error){
            console.error("Erro ao exportar CSV:", error);
            res.status(500).json({ message: 'Error exporting CSV', error: error.message });
        }
    },

    // Function export individual Talon CSV
    exportIndividualTalonCSV: async (req, res) => {
        const talonId = req.params.id;
    
        try{
            const csvFilePath = await reportService.exportIndividualTalonReport(talonId);
            res.download(csvFilePath, `talon_${talonId}.csv`);
        }catch(error){
            console.error("Erro ao exportar CSV individual:", error);
            res.status(500).json({ message: 'Error exporting individual Talon CSV', error: error.message });
        }
    },

    //details talon
    getTalonDetails: async (req, res) => {
        try {
            const { id } = req.params;
            const talon = await talonService.searchTalonId(id);
    
            if(!talon) return res.status(404).json({ message: "Talão não encontrado" });

            const storeNameOrNumber = talon.Store?.number_store === '0' ? "Matriz" : talon.Store?.number_store || "Não disponível";
    
            res.json({
                id_talon: talon.id_talon,
                storeName: storeNameOrNumber,
                dateSend: talon.date_send,
                userSend: talon.Sender?.name_users,
                dateReceived: talon.date_received,
                userReceived: talon.Receiver?.name_users,
                quantity_talon: talon.quantity_talon,
                status_talon: talon.status_talon,
            });
        }catch(error){
            console.error("Erro ao buscar detalhes do talão:", error);
            res.status(500).json({ message: "Erro ao buscar detalhes do talão" });
        }
    },

};

module.exports = talonController;
