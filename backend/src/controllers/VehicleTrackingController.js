const VehicleTrackingService = require("../services/VehicleTrackingService");

class VehicleTrackingController {

    async findAll(req, res) {

        try {

            const trackings =
                await VehicleTrackingService.findAll();

            return res.status(200).json({
                success: true,
                message: "Vehicle trackings retrieved successfully",
                data: trackings,
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

            const tracking =
                await VehicleTrackingService.findById(
                    req.params.id
                );

            return res.status(200).json({
                success: true,
                message: "Vehicle tracking retrieved successfully",
                data: tracking,
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

            const tracking =
                await VehicleTrackingService.create(
                    req.user.id,
                    req.body
                );

            return res.status(201).json({
                success: true,
                message: "Vehicle tracking created successfully",
                data: tracking,
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

            await VehicleTrackingService.delete(
                req.params.id
            );

            return res.status(200).json({
                success: true,
                message: "Vehicle tracking deleted successfully",
            });

        } catch (error) {

            return res.status(404).json({
                success: false,
                message: error.message,
            });

        }

    }

}

module.exports = new VehicleTrackingController();