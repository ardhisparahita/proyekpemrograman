import api from "./axios";

export const login = (data) => api.post("/auth/login", data);
export const getDrivers = () => {
    return api.get("/auth/drivers");
};