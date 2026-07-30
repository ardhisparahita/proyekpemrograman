import {
    getInventories,
    getInventory,
    createInventory,
    updateInventory,
    deleteInventory,
} from "../api/inventoryApi";

const inventoryService = {
    async getAll() {
        const response = await getInventories();
        return response.data;
    },

    async getById(id) {
        const response = await getInventory(id);
        return response.data;
    },

    async create(data) {
    const response = await createInventory(data);

    return response.data;
},

    async update(id, data) {
        const response = await updateInventory(id, data);
        return response.data;
    },

    async delete(id) {
        const response = await deleteInventory(id);
        return response.data;
    },
};

export default inventoryService;