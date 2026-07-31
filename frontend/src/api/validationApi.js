import api from "./axios";

export const getValidations = () => {
    return api.get("/validations");
};

export const getValidation = (id) => {
    return api.get(`/validations/${id}`);
};

export const createValidation = (data) => {
    return api.post("/validations", data);
};

export const updateValidation = (id, data) => {
    return api.put(`/validations/${id}`, data);
};

export const deleteValidation = (id) => {
    return api.delete(`/validations/${id}`);
};