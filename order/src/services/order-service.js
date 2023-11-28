const { OrderRepository } = require('../database');
const { formattedData } = require('../utils');
const { APIError } = require('../utils/app-errors');

class OrderService {

    constructor() {
        this.repository = new OrderRepository();
    }

    async getCart({ _id }) {
        try {
            const cartItems = await this.repository.GetCart(_id);

            return formattedData(cartItems);

        } catch (error) {
            throw new APIError('Data not found');
        }
    }

    async createOrder(userInputs) {

        const { _id, transactionId } = userInputs;

        // verify transaction number

        try {

            const orderResult = await this.repository.CreateNewOrder(_id, transactionId);
            return formattedData(orderResult);

        } catch (error) {
            throw new APIError('Data not found');
        }
    }

    async getOrders(userId) {
        try {
            const orders = await this.repository.GetOrders(userId);

            return formattedData(orders);

        } catch (error) {
            throw new APIError('Data not found');
        }
    }

    async manageCart(userId, item, qty, isRemoving) {

        try {
            const cartResult = await this.repository.AddToCart(userId, item, qty, isRemoving);

            return formattedData(cartResult);
    
        } catch (error) {
            throw new APIError('Data not found');
        }

    }

    async SubscribeEvents(payload) {

        const { event, data } = payload;

        const { userId, product, qty } = data;

        switch(event){
        case 'ADD_TO_CART':
            this.manageCart(userId, product, qty, false);
            break;
        case 'REMOVE_FROM_CART':
            this.manageCart(userId, product, qty, true);
            break;
        default:
            break;
        }
    }

    async getOrderPayload(userId, order, event) {

        if (order) {
            const payload = {
                event,
                data: {
                    userId,
                    order
                }
            };
            return formattedData(payload);
        }

        return formattedData({ error: 'No order found'});
    }

}

module.exports = OrderService;