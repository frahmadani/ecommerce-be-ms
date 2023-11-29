const OrderService = require('../services/order-service');
const { SubscribeMessage, PublishMessage } = require('../utils');
const { USER_BINDING_KEY, ORDER_BINDING_KEY } = require('../config');
const isAuth = require('./middlewares/auth');

module.exports = (app, channel) => {

    const service = new OrderService();

    SubscribeMessage(channel, service, ORDER_BINDING_KEY);

    app.post('/order/create', isAuth, async (req, res, next) => {

        const { _id } = req.user;
        const { transactionId } = req.body;

        // transaction is created here

        try {
            const { data } = await service.createOrder({ _id, transactionId });

            console.log('Data: ', data);

            const payload = await service.getOrderPayload(_id, data, 'CREATE_ORDER');

            // PublishUserEvents(payload.data);
            PublishMessage(channel, USER_BINDING_KEY, JSON.stringify(payload.data));

            // PublishTransactionEvents(payload.data); --> TODO

            return res.status(200).json(data);

        } catch (error) {
            return res.status(500).json(error);
        }
    });

    app.get('/order', isAuth, async (req, res, next) => {

        const { _id } = req.user;

        try {

            const { data } = await service.getOrders(_id);

            return res.status(200).json(data);

        } catch (error) {
            return res.status(500).json(error);
        }
    });

    app.get('/order/cart', isAuth, async (req, res, next) => {

        const { _id } = req.user;

        try {
            const { data } = await service.getCart({ _id });

            return res.status(200).json(data);

        } catch (error) {
            return res.status(500).json(error);
        }
        
    });
};