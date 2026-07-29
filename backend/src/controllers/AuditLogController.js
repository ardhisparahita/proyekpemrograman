const AuditLogService = require("../services/AuditLogService");

class AuditLogController {

    async findAll(req, res) {

        try {

            const auditLogs =
                await AuditLogService.findAll();

            return res.status(200).json({
                success: true,
                message: "Audit logs retrieved successfully",
                data: auditLogs,
            });

        } catch (error) {

            return res.status(500).json({
                success: false,
                message: error.message,
            });

        }

    }

    async findById(req, res) {

        try {

            const auditLog =
                await AuditLogService.findById(
                    req.params.id
                );

            return res.status(200).json({
                success: true,
                message: "Audit log retrieved successfully",
                data: auditLog,
            });

        } catch (error) {

            return res.status(404).json({
                success: false,
                message: error.message,
            });

        }

    }

    async create(req, res) {

        try {

            const auditLog =
                await AuditLogService.create(
                    req.user.id,
                    req.body,
                    req.ip
                );

            return res.status(201).json({
                success: true,
                message: "Audit log created successfully",
                data: auditLog,
            });

        } catch (error) {

            return res.status(400).json({
                success: false,
                message: error.message,
            });

        }

    }

    async delete(req, res) {

        try {

            await AuditLogService.delete(
                req.params.id
            );

            return res.status(200).json({
                success: true,
                message: "Audit log deleted successfully",
            });

        } catch (error) {

            return res.status(404).json({
                success: false,
                message: error.message,
            });

        }

    }

}

module.exports = new AuditLogController();