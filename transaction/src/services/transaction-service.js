const { TransactionRepository } = require('../database');

const { formattedData } = require('../utils');
const { APIError } = require('../utils/app-errors');

class TransactionService {

    constructor() {
        this.repository = new TransactionRepository();
    }

    async CreateOrder(userId, order) {
        console.log('Success entering CreateORder in transaction service');
        console.log('Userid: ', userId);
        console.log('order: ', order);

        try {
            const transactionResult = await this.repository.CreateTransaction(userId, order);

            return formattedData(transactionResult);

        } catch (error) {
            throw new APIError('Data not found');
        }
    }

    async payForTransaction(userInputs) {
        const { _id, transactionId, channel } = userInputs;

        try {
            const transaction = await this.repository.GetTransaction(transactionId);

            transaction.status = 'paid';
            transaction.channel = channel || 'unspecified_payment_channel';
            transaction.save();

            return formattedData(transaction);

        } catch (error) {
            throw new APIError('Data not found');
        }
    }

    async SubscribeEvents(payload) {

        const { event, data } = payload;

        const { userId, order } = data;

        switch(event) {
        case 'CREATE_ORDER':
            this.CreateOrder(userId, order);
            break;
        default:
            break;
        }

        console.log('Received payload on SubscribeEvents method: ', payload);

    }
}

module.exports = TransactionService;