import api from "./axios";

export const getDeliveryOrders = () =>
    api.get("/delivery-orders");

export const getDeliveryOrder = (id) =>
    api.get(`/delivery-orders/${id}`);

export const createDeliveryOrder = (data) =>
    api.post("/delivery-orders", data);

export const updateDeliveryOrder = (id, data) =>
    api.put(`/delivery-orders/${id}`, data);

export const deleteDeliveryOrder = (id) =>
    api.delete(`/delivery-orders/${id}`);