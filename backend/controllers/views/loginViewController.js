const loginViewController = {

    getLoginPage: (req, res) => {
        res.render('login', { 
            layout: 'layouts/loginLayout', 
            title: 'Login', 
            cssFiles: ['/css/login.css'],
            messages: res.locals.messages
        });
    },
    
};

module.exports = loginViewController;
