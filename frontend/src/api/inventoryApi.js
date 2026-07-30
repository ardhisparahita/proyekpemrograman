import api from "./axios";

export const getInventories = () => {
    return api.get("/inventories");
};

export const getInventory = (id) => {
    return api.get(`/inventories/${id}`);
};

export const createInventory = (data) => {
    return api.post("/inventories", data);
};

export const updateInventory = (id, data) => {
    return api.put(`/inventories/${id}`, data);
};

export const deleteInventory = (id) => {
    return api.delete(`/inventories/${id}`);
};