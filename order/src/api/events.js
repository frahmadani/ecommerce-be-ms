const OrderService = require('../services/order-service');

module.exports = (app) => {

    const service = new OrderService();

    app.post('/order/events', async (req, res, next) => {

        const { payload } = req.body;

        service.SubscribeEvents(payload);

        console.log('Order service receiving event');
        console.log('Payload: ', payload);
        return res.status(200).json(payload);
    });
    
};