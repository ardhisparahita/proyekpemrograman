import api from "./axios";

export const getAuditLogs = () => {
    return api.get("/audit-logs");
};

export const getAuditLog = (id) => {
    return api.get(`/audit-logs/${id}`);
};

export const createAuditLog = (data) => {
    return api.post("/audit-logs", data);
};

export const updateAuditLog = (id, data) => {
    return api.put(`/audit-logs/${id}`, data);
};

export const deleteAuditLog = (id) => {
    return api.delete(`/audit-logs/${id}`);
};