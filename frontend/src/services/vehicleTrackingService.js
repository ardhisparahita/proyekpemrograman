import {
    getVehicleTrackings,
    getVehicleTracking,
    createVehicleTracking,
    updateVehicleTracking,
    deleteVehicleTracking,
} from "../api/vehicleTrackingApi";

const vehicleTrackingService = {
    async getAll() {
        const response =
            await getVehicleTrackings();

        return response.data;
    },

    async getById(id) {
        const response =
            await getVehicleTracking(id);

        return response.data;
    },

    async create(data) {
        const response =
            await createVehicleTracking(data);

        return response.data;
    },

    async update(id, data) {
        const response =
            await updateVehicleTracking(id, data);

        return response.data;
    },

    async delete(id) {
        const response =
            await deleteVehicleTracking(id);

        return response.data;
    },
};

export default vehicleTrackingService;