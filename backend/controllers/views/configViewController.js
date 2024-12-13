const configViewService = require('../../services/views/configViewService');

const configViewController = {
    getPasswordPage: async (req, res) => {
        try{ 
            const  registration  = req.params.registration;
            
            const { user } = await configViewService.getPasswordConfigData(registration);

            res.render('partials/configuracao/config', {
                layout: false,
                user,
                title: 'Alterar Senha',
            });
        }catch(error){
            console.error('Erro ao carregar página de senha:', error);
            res.status(500).send('Erro ao carregar a página de alteração de senha.');
        }
    },

    updatePassword: async (req, res) => {
        try{
            const  registration  = req.params.registration;
            const { currentPassword, newPassword } = req.body;

            await userService.updatePassword(registration, currentPassword, newPassword);
            res.status(200).json({ message: 'Senha atualizada com sucesso.' });
        }catch(error){
            console.error('Erro ao atualizar senha:', error);
            res.status(400).json({ message: error.message });
        }
    },
}

module.exports = configViewController;