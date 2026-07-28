const ProductRepository = require("../repositories/ProductRepository");

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
        // Cek apakah SKU sudah digunakan
        const existingProduct = await ProductRepository.findBySku(data.sku);

        if (existingProduct) {
            throw new Error("SKU already exists");
        }

        // Validasi harga
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

        // Jika SKU diubah, cek apakah sudah digunakan
        if (data.sku) {
            const existingProduct = await ProductRepository.findBySku(data.sku);

            if (
                existingProduct &&
                existingProduct.id !== Number(id)
            ) {
                throw new Error("SKU already exists");
            }
        }

        // Validasi harga jika dikirim
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