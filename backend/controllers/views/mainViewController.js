const mainViewController = {

    getMainPage: (req, res) => {
        res.render('partials/main/main', { 
            layout: false, 
            title: 'Página Inicial - Dashboard',
        });
    },
    
};

module.exports = mainViewController;
