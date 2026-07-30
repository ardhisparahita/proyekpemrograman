import api from "./axios";

export const getWarehouses = () => {
    return api.get("/warehouses");
};

export const getWarehouse = (id) => {
    return api.get(`/warehouses/${id}`);
};

export const createWarehouse = (data) => {
    return api.post("/warehouses", data);
};

export const updateWarehouse = (id, data) => {
    return api.put(`/warehouses/${id}`, data);
};

export const deleteWarehouse = (id) => {
    return api.delete(`/warehouses/${id}`);
};