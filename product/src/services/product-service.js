const { ProductRepository } = require('../database');
const { formattedData } = require('../utils');

class ProductService {

    constructor() {
        this.repository = new ProductRepository();
    }

    async createProduct(productData) {

        const productResult = await this.repository.CreateProduct(productData);
        return formattedData(productResult);
    }

    async getProducts() {

        const products = await this.repository.GetProducts();

        let categories = {};

        products.map(({ type }) => {
            categories[type] = type;
        });

        return formattedData({
            products,
            categories: Object.keys(categories)
        });
    }

    async getProductDetail(productId) {

        const product = await this.repository.FindProductById(productId);
        return formattedData(product);
    }

    async getProductsByCategory(category) {

        const products = await this.repository.FindByCategory(category);
        return formattedData(products);
    }

}

module.exports = ProductService;