const { Product } = require('../models');

class ProductRepository {

    async CreateProduct({ name, desc, banner, type, unit, price, available, supplier }) {
        
        const product = new Product({
            name, desc, banner, type, unit, price, available, supplier
        });

        const productResult = await product.save();
        return productResult;
    }

    async GetProducts() {

        return await Product.find();
    }

    async FindProductById(id) {

        return await Product.findById(id);
    }

    async FindByCategory(category) {

        return await Product.find({ type: category });
    }

}

module.exports = ProductRepository;