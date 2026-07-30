import {
    getWarehouses,
    getWarehouse,
    createWarehouse,
    updateWarehouse,
    deleteWarehouse,
} from "../api/warehouseApi";

const warehouseService = {
    async getAll() {
        const response = await getWarehouses();
        return response.data;
    },

    async getById(id) {
        const response = await getWarehouse(id);
        return response.data;
    },

    async create(data) {
        const response = await createWarehouse(data);
        return response.data;
    },

    async update(id, data) {
        const response = await updateWarehouse(id, data);
        return response.data;
    },

    async delete(id) {
        const response = await deleteWarehouse(id);
        return response.data;
    },
};

export default warehouseService;