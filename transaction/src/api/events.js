const TransactionService = require('../services/transaction-service');

module.exports = (app) => {

    const service = new TransactionService();

    app.post('/transaction/events', async (req, res, next) => {

        const { payload } = req.body;

        service.SubscribeEvents(payload);

        console.log('Transaction service receiving event');
        console.log('Payload: ', payload);
        return res.status(200).json(payload);
    });
    
};