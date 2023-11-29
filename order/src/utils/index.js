const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const axios = require('axios');

const { APP_SECRET } = require('../config');

module.exports.generateSalt = async () => {
    return await bcrypt.genSalt();
};

module.exports.generatePassword = async (password, salt) => {
    return await bcrypt.hash(password, salt);
};

module.exports.validatePassword = async (enteredPassword, savedPassword, salt) => {

    return (await this.generatePassword(enteredPassword, salt)) === savedPassword;
};

module.exports.formattedData = (data) => {
    if (data) {
        return { data };
    } else {
        throw new Error('Data not found');
    }

};

module.exports.generateSignature = async (payload) => {
    try {
        return await jwt.sign(payload, APP_SECRET, { 'expiresIn': '1h' });
    } catch (error) {
        console.log(error);
        return error;
    }
};

module.exports.validateSignature = async (req) => {
    try {
        const signature = req.get('Authorization');
        console.log(signature);

        const payload = await jwt.verify(signature.split(' ')[1], APP_SECRET);
        req.user = payload;
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
};

module.exports.PublishUserEvents = async (payload) => {

    axios.post('http://localhost:3001/user/events', { payload });

    console.log('Sending event to User service', payload);

};

module.exports.PublishTransactionEvents = async (payload) => {

    axios.post('http://localhost:3004/transaction/events', { payload });

    console.log('Sending event to Transaction service', payload);
};
