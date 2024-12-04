const resetPasswordViewController = {

    getResetPasswordPage: (req, res) => {
        const token = req.query.token || '';
        res.render('resetPassword', { 
            layout: 'layouts/loginLayout',
            title: 'Redefinir Senha', 
            cssFiles: [
                '/css/resetPassword.css'
            ],
            token
        });
    },

};

module.exports = resetPasswordViewController;
