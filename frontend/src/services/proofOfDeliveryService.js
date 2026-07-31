import {
    getProofs,
    getProof,
    createProof,
    updateProof,
    deleteProof,
} from "../api/proofOfDeliveryApi";

const proofOfDeliveryService = {
    async getAll() {
        const response = await getProofs();
        return response.data;
    },

    async getById(id) {
        const response = await getProof(id);
        return response.data;
    },

    async create(data) {
        const response = await createProof(data);
        return response.data;
    },

    async update(id, data) {
        const response = await updateProof(id, data);
        return response.data;
    },

    async delete(id) {
        const response = await deleteProof(id);
        return response.data;
    },
};

export default proofOfDeliveryService;