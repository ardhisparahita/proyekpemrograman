const AuditLogRepository = require("../repositories/AuditLogsRepository");
const UserRepository = require("../repositories/UserRepository");

class AuditLogService {

    async findAll() {

        return await AuditLogRepository.findAll();

    }

    async findById(id) {

        const auditLog =
            await AuditLogRepository.findById(id);

        if (!auditLog) {
            throw new Error("Audit log not found");
        }

        return auditLog;

    }

    async create(userId, data, ipAddress) {

        const user =
            await UserRepository.findById(userId);

        if (!user) {
            throw new Error("User not found");
        }

        return await AuditLogRepository.create({
            user_id: userId,
            activity: data.activity,
            module: data.module,
            ip_address: ipAddress,
        });

    }

    async delete(id) {

        const auditLog =
            await AuditLogRepository.findById(id);

        if (!auditLog) {
            throw new Error("Audit log not found");
        }

        return await AuditLogRepository.delete(id);

    }

}

module.exports = new AuditLogService();