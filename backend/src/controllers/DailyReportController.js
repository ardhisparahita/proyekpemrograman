const DailyReportService = require("../services/DailyReportService");

class DailyReportController {

    async findAll(req, res) {

        try {

            const reports =
                await DailyReportService.findAll();

            return res.status(200).json({
                success: true,
                message: "Daily reports retrieved successfully",
                data: reports,
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

            const report =
                await DailyReportService.findById(
                    req.params.id
                );

            return res.status(200).json({
                success: true,
                message: "Daily report retrieved successfully",
                data: report,
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

            const report =
                await DailyReportService.create(
                    req.user.id,
                    req.body
                );

            return res.status(201).json({
                success: true,
                message: "Daily report created successfully",
                data: report,
            });

        } catch (error) {

            return res.status(400).json({
                success: false,
                message: error.message,
            });

        }

    }

    async update(req, res) {

        try {

            const report =
                await DailyReportService.update(
                    req.params.id,
                    req.body
                );

            return res.status(200).json({
                success: true,
                message: "Daily report updated successfully",
                data: report,
            });

        } catch (error) {

            return res.status(404).json({
                success: false,
                message: error.message,
            });

        }

    }

    async delete(req, res) {

        try {

            await DailyReportService.delete(
                req.params.id
            );

            return res.status(200).json({
                success: true,
                message: "Daily report deleted successfully",
            });

        } catch (error) {

            return res.status(404).json({
                success: false,
                message: error.message,
            });

        }

    }

}

module.exports = new DailyReportController();