const ProductService = require('../services/product-service');
const { PublishOrderEvents, PublishUserEvents, PublishMessage } = require('../utils');
const isAuth = require('./middlewares/auth');
const { USER_BINDING_KEY, ORDER_BINDING_KEY } = require('../config');

module.exports = (app, channel) => {

    const service = new ProductService();

    app.post('/product/create', async (req, res, next) => {
        const { name, desc, banner, type, unit, price, available, supplier } = req.body;

        const { data } = await service.createProduct({
            name, desc, banner, type, unit, price, available, supplier  
        });

        return res.json(data);
    });

    app.get('/product/:id', async (req, res, next) => {
        const productId = req.params.id;

        try {
            const { data } = await service.getProductById(productId);
            return res.status(200).json(data);
        } catch (err) {
            return res.status(404).json({ err });
        }
    });

    app.get('/product', async (req, res, next) => {
        try {
            const { data } = await service.getProducts();
            return res.status(200).json(data);
        } catch (error) {
            return res.status(404).json({ error });
        }
    });

    app.get('/product/category/:type', async (req, res, next) => {
        const type = req.params.type;

        try {
            const { data } = await service.getProductsByCategory(type);
            return res.json(data);
        } catch (error) {
            return res.status(404).json({ error });
        }
    });

    app.put('/product/cart', isAuth, async (req, res, next) => {

        const userId = req.user._id;
        const { _id, qty } = req.body;

        try {
            const { data } = await service.getProductPayload(userId, { productId: _id, qty: qty }, 'ADD_TO_CART');

            console.log('Data yg dikirim ke user service dan order service: ', data);

            // PublishUserEvents(data);
            // PublishOrderEvents(data);

            PublishMessage(channel, USER_BINDING_KEY, JSON.stringify(data));
            PublishMessage(channel, ORDER_BINDING_KEY, JSON.stringify(data));

            const response = {
                product: data.data.product,
                qty: data.data.qty
            };

            return res.status(200).json(response);

        } catch (error) {
            return res.status(500).json({ error });
        }

    });

    app.delete('/product/cart/:id', isAuth, async (req, res, next) => {

        const userId = req.user._id;
        const productId = req.params.id;

        try {
            const { data } = await service.getProductPayload(userId, { productId }, 'REMOVE_FROM_CART');

            // PublishUserEvents(data);
            // PublishOrderEvents(data);

            PublishMessage(channel, USER_BINDING_KEY, JSON.stringify(data));
            PublishMessage(channel, ORDER_BINDING_KEY, JSON.stringify(data));

            const response = {
                product: data.data.product,
                qty: data.data.qty
            };

            return res.status(200).json(response);

        } catch (error) {
            return res.status(500).json({ error });
        }
        
    });

};