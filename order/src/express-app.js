const express = require('express');
const cors = require('cors');
const { orders, events } = require('./api');

module.exports = async (app) => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true, limit: '1mb' }));
    app.use(cors());
    
    // Event handler (API)
    events(app);

    // API
    orders(app);

};