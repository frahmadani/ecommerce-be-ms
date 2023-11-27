const ProductService = require('../services/product-service');
const uuidv4 = 

module.exports = (app) => {
    const service = new ProductService();

    app.post('/product/create', async (req, res, next) => {
        const { name, desc, banner, type, unit, price, available, supplier } = req.body;

        const { data } = await service.createProduct({
            name, desc, banner, type, unit, price, available, supplier  
        });

        return res.json(data);
    });

    app.get('/:id', async (req, res, next) => {
        const productId = req.params.id;

        try {
            const { data } = await service.getProductDetail(productId);
            return res.status(200).json(data);
        } catch (err) {
            return res.status(404).json({ err });
        }
    });

};