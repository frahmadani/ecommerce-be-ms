const dotenv = require('dotenv');

dotenv.config();

if (process.env.NODE_ENV !== 'prod') {
    const configFile = `./.env.${process.env.NODE_ENV}`;
    dotenv.config({ path: configFile });
} else {
    dotenv.config();
}

module.exports = {
    PORT: process.env.PORT,
    MONGO_URI: process.env.MONGO_URI,
    BASE_URL: process.env.BASE_URL,
    APP_SECRET: process.env.APP_SECRET,
    MESSAGEBROKER_URL: 'amqp://rabbitmq',
    EXCHANGE_NAME: 'ECOMMERCE_APP_EXCHANGE',
    ORDER_BINDING_KEY: 'ORDER_BINDING_KEY',
    USER_BINDING_KEY: 'USER_BINDING_KEY'
};