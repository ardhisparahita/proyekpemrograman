import {
    getValidations,
    getValidation,
    createValidation,
    updateValidation,
    deleteValidation,
} from "../api/validationApi";

const validationService = {
    async getAll() {
        const response = await getValidations();
        return response.data;
    },

    async getById(id) {
        const response = await getValidation(id);
        return response.data;
    },

    async create(data) {
        const response = await createValidation(data);
        return response.data;
    },

    async update(id, data) {
        const response = await updateValidation(id, data);
        return response.data;
    },

    async delete(id) {
        const response = await deleteValidation(id);
        return response.data;
    },
};

export default validationService;