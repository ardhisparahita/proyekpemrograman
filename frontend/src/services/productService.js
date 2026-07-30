import {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
} from "../api/productApi";

const productService = {
    async getAll() {
        const response = await getProducts();
        return response.data;
    },

    async getById(id) {
        const response = await getProduct(id);
        return response.data;
    },

    async create(data) {
        const response = await createProduct(data);
        return response.data;
    },

    async update(id, data) {
        const response = await updateProduct(id, data);
        return response.data;
    },

    async delete(id) {
        const response = await deleteProduct(id);
        return response.data;
    },
};

export default productService;