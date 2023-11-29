const express = require('express');
const cors = require('cors');
const { products, events } = require('./api');
const ErrorHandler = require('./utils/error-handlers');


module.exports = async (app) => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true, limit: '1mb' }));
    app.use(cors());
    
    // API event listener
    events(app);

    // Product APIs
    products(app);

    app.use(ErrorHandler);
};