import {
    getDailyReports,
    getDailyReport,
    createDailyReport,
    updateDailyReport,
    deleteDailyReport,
} from "../api/dailyReportApi";

const dailyReportService = {
    async getAll() {
        const response =
            await getDailyReports();

        return response.data;
    },

    async getById(id) {
        const response =
            await getDailyReport(id);

        return response.data;
    },

    async create(data) {
        const response =
            await createDailyReport(data);

        return response.data;
    },

    async update(id, data) {
        const response =
            await updateDailyReport(id, data);

        return response.data;
    },

    async delete(id) {
        const response =
            await deleteDailyReport(id);

        return response.data;
    },
};

export default dailyReportService;