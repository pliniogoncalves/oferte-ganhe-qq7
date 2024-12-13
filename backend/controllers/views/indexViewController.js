const  User  = require('../../models/User');

const indexViewController = {
    getIndexPage: async (req, res) => {
        try {
            const userId = req.user.id;

            const user = await User.findByPk(userId, {
                include: [
                    { association: 'profile', attributes: ['name_profile'] },
                    { association: 'store', attributes: ['name_store'] },
                ],
                attributes: ['id_users', 'name_users', 'registration_users'],
            });

            res.render('index', {
                layout: 'layouts/indexLayout',
                title: 'Página Inicial - Dashboard',
                cssFiles: [
                    '/css/global.css',
                    '/css/header.css',
                    '/css/sidebar.css',
                    'css/buttons.css',
                    'css/tables.css',
                    'css/notifications.css',
                    'css/modal.css',
                    'css/responsive.css',
                    'css/user-info.css',
                ],
                user,
            });
        } catch (error) {
            console.error('Erro ao carregar a página inicial:', error);
            res.status(500).send('Erro ao carregar a página inicial.');
        }
    },
};

module.exports = indexViewController;
