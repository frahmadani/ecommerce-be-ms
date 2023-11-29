const express = require('express');
const { PORT } = require('./config');
const { databaseConn } = require('./database');
const expressApp = require('./express-app');

const StartServer = async () => {

    const app = express();

    await databaseConn();

    await expressApp(app);

    app.listen(PORT, () => {
        console.log(`Order service listening on port ${PORT}`);
    })
        .on('error', (err) => {
            console.log(err);
        });
};

StartServer();