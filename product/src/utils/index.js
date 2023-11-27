const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const amqplib = require('amqplib');

module.exports.formattedData = async (data) => {

    if (data) {
        return { data };
    } else {
        throw new Error('Data not found');
    }
};