const ProductRepository = require('../repositories/ProductRepositories');

class ProductService {

    async findAll() {
        return await ProductRepository.findAll();
    }

    async findById(id) {
        const product = await ProductRepository.findById(id);

        if (!product) {
            throw new Error("Product not found");
        }

        return product;
    }

    async create(data) {
        const existingProduct = await ProductRepository.findByProductCode(data.product_code);

        if (existingProduct) {
            throw new Error("already exists");
        }

        if (data.price <= 0) {
            throw new Error("Price must be greater than 0");
        }

        return await ProductRepository.create(data);
    }

    async update(id, data) {
        const product = await ProductRepository.findById(id);

        if (!product) {
            throw new Error("Product not found");
        }

        if (data.product_code) {
            const existingProduct = await ProductRepository.findByProductCode(data.product_code);

            if (
                existingProduct &&
                existingProduct.id !== Number(id)
            ) {
                throw new Error("already exists");
            }
        }

        if (data.price !== undefined && data.price <= 0) {
            throw new Error("Price must be greater than 0");
        }

        return await ProductRepository.update(id, data);
    }

    async delete(id) {
        const product = await ProductRepository.findById(id);

        if (!product) {
            throw new Error("Product not found");
        }

        return await ProductRepository.delete(id);
    }
}

module.exports = new ProductService();