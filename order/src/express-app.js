const express = require('express');
const cors = require('cors');
const { orders } = require('./api');

module.exports = async (app, channel) => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true, limit: '1mb' }));
    app.use(cors());
    
    // Event handler (API)
    // events(app);

    // API
    orders(app, channel);

};