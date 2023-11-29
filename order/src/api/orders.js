const OrderService = require('../services/order-service');
const { PublishUserEvents, PublishTransactionEvents } = require('../utils');
const isAuth = require('./middlewares/auth');

module.exports = (app) => {

    const service = new OrderService();

    app.post('/order/create', isAuth, async (req, res, next) => {

        const { _id } = req.user;
        const { transactionId } = req.body;

        // transaction is created here

        try {
            const { data } = await service.createOrder({ _id, transactionId });

            console.log('Data: ', data);

            const payload = await service.getOrderPayload(_id, data, 'CREATE_ORDER');

            PublishUserEvents(payload.data);
            PublishTransactionEvents(payload.data);

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