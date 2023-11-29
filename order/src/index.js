const express = require('express');
const { PORT } = require('./config');
const { databaseConn } = require('./database');
const expressApp = require('./express-app');

const { CreateChannel } = require('./utils');

const StartServer = async () => {

    const app = express();

    await databaseConn();

    const channel = CreateChannel();

    await expressApp(app, channel);

    app.listen(PORT, () => {
        console.log(`Order service istening on port ${PORT}`);
    })
        .on('error', (err) => {
            console.log(err);
        });
};

StartServer();