const profileService = require('../services/profileService.js');
const reportService = require('../services/reportService');

//Controller for the profile page
const profileController = {

    //Function to register a new Profile
    insertProfile: async (req, res) => {
        const {name} = req.body;

        try{
            const newProfile = await profileService.insertProfile(name);
            res.status(201).json({ message: 'Profile registered successfully!', profile: newProfile});
        }catch(erro){
            res.status(500).json({ message: 'Error registering profile', erro: erro.message});
        }
    },

    //Function to Search All Profiles
    searchProfile: async (req, res) => {
        try{
            const profiles = await profileService.searchProfile();
            res.status(200).json(profiles);
        }catch(err){
            res.status(500).json({ message: 'Error fetching all Profiles', error: err.message });
        }
    },

    //Function to Search for a profile by name
    searchProfileName: async (req, res) => {
        const { name } = req.params;

        try{
            const result = await profileService.searchProfileName(name);
            if(result){
                res.status(200).json(result);
            }else{
                res.status(404).json({ message: 'Profile not found' });
            }
        }catch(err){
            res.status(500).json({ message: 'Error fetching profile', error: err.message });
        }
    },

    //Function to edit an existing Profile
    editProfile: async (req, res) =>{
        const { name } = req.params;
        const { newName } = req.body;

        try{
            const updateProfile = await profileService.editProfile(newName, name);
            if(updateProfile){
                res.status(200).json({ message: 'Profile updated successfully!', profile: updateProfile });
            }else{
                res.status(404).json({ message: 'Profile not found.' });
            }
        }catch(erro){
            res.status(500).json({ message: 'Error editing Profile', error: erro.message });
        }
    },

    //Function to delete a Profile
    removeProfile: async (req, res) => {
        const { name } = req.params;
    
        try{
            const removedProfile = await profileService.removeProfile(name);
            if(removedProfile){
                res.status(200).json({ message: 'Profile deleted successfully!' });
            }else{
                res.status(404).json({ message: 'Profile not found.' });
            }
        }catch(error){
            res.status(500).json({ message: 'Error deleting Profile', error: error.message });
        }
    },

     //Function export CSV
     exportProfilesCSV: async (req, res) =>{
        try{
            const csvFilePath = await reportService.exportProfilesReport();
            res.download(csvFilePath, 'perfis.csv');
        }catch(error){
            console.error("Erro ao exportar CSV:", error);
            res.status(500).json({ message: 'Error exporting CSV', error: error.message });
        }
    },

};

module.exports = profileController;
