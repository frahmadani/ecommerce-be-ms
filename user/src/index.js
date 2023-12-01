const express = require('express');

const { PORT } = require('./config');
const { databaseConn } = require('./database');
const expressApp = require('./express-app');
const { CreateChannel } = require('./utils');
const logger = require('./utils/app-logger');

const StartServer = async () => {

    const app = express();

    await databaseConn();

    const channel = await CreateChannel();

    await expressApp(app, channel);

    app.listen(PORT, () => {
        console.log(`User service listening on port ${PORT}`);
        logger.info(`User service listening on port ${PORT}`);
    })
        .on('error', (err) => {
            console.log(err);
        });
};

StartServer();