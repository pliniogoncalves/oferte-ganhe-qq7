const express = require('express');
const session = require('express-session');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const frontendMiddleware = require('./middlewares/frontendMiddleware');
const { messageMiddleware } = require('./middlewares/messagesMiddleware.js');

const app = express();

//Express Session
app.use(session({
    secret: '12345',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000 }
}));

// Middleware to manage messages
app.use(messageMiddleware); 

//Middleware to process Frontend
frontendMiddleware(app);
 
//Middleware to process JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware to process cookies
app.use(cookieParser());

//importing routes
const viewRoutes = require('./routes/viewRoutes.js');
const userRoutes = require('./routes/userRoutes.js');
const profileRoutes = require('./routes/profileRoutes.js');
const permissionRoutes = require('./routes/permissionRoutes.js');
const profilePermission = require('./routes/profilePermissionRoutes.js'); 
const talonRoutes = require('./routes/talonRoutes.js');
const stockRoutes = require('./routes/stockRoutes.js');
const storeRoutes = require('./routes/storeRoutes.js');
const transactionRoutes = require('./routes/transactionRoutes.js');
const authRoutes = require('./routes/authRoutes.js');

//Use view routes
app.use('/', viewRoutes);
app.use('/api', userRoutes);
app.use('/api', profileRoutes);
app.use('/api', permissionRoutes);
app.use('/api', profilePermission);
app.use('/api', talonRoutes);
app.use('/api', stockRoutes);
app.use('/api', storeRoutes);
app.use('/api', transactionRoutes);
app.use('/api', authRoutes);

//Set a default route to redirect to login
app.get('/', (req, res) => {
    if(!req.cookies.token) {
        res.redirect('/login');
    }else{
        res.redirect('/index');
    }
});

app.use((req, res, next) => {
    req.addMessage = (msg) => {
        if (!res.locals.messages) res.locals.messages = [];
        res.locals.messages.push(msg);
    };
    next();
});

module.exports = app;