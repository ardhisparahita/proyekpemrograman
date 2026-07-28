const { Product } = require("../models");

class ProductRepository {

    async findAll() {
        return await Product.findAll();
    }

    async findById(id) {
        return await Product.findByPk(id);
    }

    async findBySku(sku) {
        return await Product.findOne({
            where: {
                sku,
            },
        });
    }

    async create(data) {
        return await Product.create(data);
    }

    async update(id, data) {
        const product = await Product.findByPk(id);

        await product.update(data);

        return product;
    }

    async delete(id) {
        const product = await Product.findByPk(id);

        return await product.destroy();
    }

}

module.exports = new ProductRepository();