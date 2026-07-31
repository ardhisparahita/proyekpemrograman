import api from "./axios";

export const getDailyReports = () => {
    return api.get("/daily-reports");
};

export const getDailyReport = (id) => {
    return api.get(`/daily-reports/${id}`);
};

export const createDailyReport = (data) => {
    return api.post("/daily-reports", data);
};

export const updateDailyReport = (id, data) => {
    return api.put(`/daily-reports/${id}`, data);
};

export const deleteDailyReport = (id) => {
    return api.delete(`/daily-reports/${id}`);
};