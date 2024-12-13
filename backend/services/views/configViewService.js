const userService = require('../../services/userService');

const configViewService = {
   getEditConfigData: async (registration) => {
        try{
            const user = await userService.searchUserRegistration(registration);
            return { user };
        }catch(error){
            console.error(`Erro ao buscar dados para edição do usuário ${registration}:`, error.message);
            throw error;
        }
    },
    getPasswordConfigData: async (registration) => {
        try{
            const user = await userService.searchUserRegistration(registration);
            if (!user) throw new Error('Usuário não encontrado.');
            return { user };
        }catch(error){
            console.error(`Erro ao buscar dados para alteração de senha do usuário ${registration}:`, error.message);
            throw error;
        }
    },
};

module.exports = configViewService ;