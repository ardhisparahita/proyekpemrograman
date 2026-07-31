import {
    getAuditLogs,
    getAuditLog,
    createAuditLog,
    updateAuditLog,
    deleteAuditLog,
} from "../api/auditLogApi";

const auditLogService = {
    async getAll() {
        const response =
            await getAuditLogs();

        return response.data;
    },

    async getById(id) {
        const response =
            await getAuditLog(id);

        return response.data;
    },

    async create(data) {
        const response =
            await createAuditLog(data);

        return response.data;
    },

    async update(id, data) {
        const response =
            await updateAuditLog(id, data);

        return response.data;
    },

    async delete(id) {
        const response =
            await deleteAuditLog(id);

        return response.data;
    },
};

export default auditLogService;