const {
    AuditLog,
    User,
} = require("../models");

class AuditLogRepository {

    async findAll() {
        return await AuditLog.findAll({
            include: [
                {
                    model: User,
                    as: "user",
                    attributes: [
                        "id",
                        "name",
                        "email",
                        "role",
                    ],
                },
            ],
            order: [["created_at", "DESC"]],
        });
    }

    async findById(id) {
        return await AuditLog.findByPk(id, {
            include: [
                {
                    model: User,
                    as: "user",
                    attributes: [
                        "id",
                        "name",
                        "email",
                        "role",
                    ],
                },
            ],
        });
    }

    async create(data, transaction = null) {
        return await AuditLog.create(data, {
            transaction,
        });
    }

    async delete(id) {

        const audit =
            await AuditLog.findByPk(id);

        if (!audit) {
            return null;
        }

        await audit.destroy();

        return true;
    }

}

module.exports = new AuditLogRepository();