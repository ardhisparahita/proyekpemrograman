import api from "./axios";

export const getVehicleTrackings = () => {
    return api.get("/vehicle-trackings");
};

export const getVehicleTracking = (id) => {
    return api.get(`/vehicle-trackings/${id}`);
};

export const createVehicleTracking = (data) => {
    return api.post("/vehicle-trackings", data);
};

export const updateVehicleTracking = (id, data) => {
    return api.put(`/vehicle-trackings/${id}`, data);
};

export const deleteVehicleTracking = (id) => {
    return api.delete(`/vehicle-trackings/${id}`);
};