import api from "./axios";

export const getProofs = () => {
    return api.get("/proof-of-deliveries");
};

export const getProof = (id) => {
    return api.get(`/proof-of-deliveries/${id}`);
};

export const createProof = (data) => {
    return api.post("/proof-of-deliveries", data);
};

export const updateProof = (id, data) => {
    return api.put(`/proof-of-deliveries/${id}`, data);
};

export const deleteProof = (id) => {
    return api.delete(`/proof-of-deliveries/${id}`);
};