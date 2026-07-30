import {
    getDeliveryOrders,
    getDeliveryOrder,
    createDeliveryOrder,
    updateDeliveryOrder,
    deleteDeliveryOrder,
} from "../api/deliveryOrderApi";

const deliveryOrderService = {
    async getAll() {
        const response = await getDeliveryOrders();
        return response.data;
    },

    async getById(id) {
        const response = await getDeliveryOrder(id);
        return response.data;
    },

    async create(data) {
        const response = await createDeliveryOrder(data);
        return response.data;
    },

    async update(id, data) {
        const response = await updateDeliveryOrder(id, data);
        return response.data;
    },

    async delete(id) {
        const response = await deleteDeliveryOrder(id);
        return response.data;
    },
};

export default deliveryOrderService;