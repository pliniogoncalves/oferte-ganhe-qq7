const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');

const frontendMiddleware = (app) => {

  // Configure layout
  app.use(expressLayouts);
  app.set('view engine', 'ejs');
  app.set('views', path.join(__dirname, '../../frontend/views'));

  // Middleware to define default layout
  app.use((req, res, next) => {
    res.locals.layout = 'layouts/indexLayout';
    next();
  });

  // Middleware for serving static files
  app.use(express.static(path.join(__dirname, '../../frontend/public')));
};

module.exports = frontendMiddleware;
