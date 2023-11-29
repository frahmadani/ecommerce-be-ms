const TransactionService = require('../services/transaction-service');
const isAuth = require('./middlewares/auth'); 

module.exports = (app) => {

    const service = new TransactionService();

    app.post('/transaction/pay', isAuth, async (req, res, next) => {
        
        const { _id } = req.user;
        const { transactionId, channel } = req.body;

        try {
            const { data } = await service.payForTransaction({ _id, transactionId, channel });

            return res.status(200).json(data);

        } catch (error) {
            return res.status(500).json(error);
        }
        
    });

    
};