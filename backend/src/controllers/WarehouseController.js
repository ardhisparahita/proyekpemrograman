const WarehouseService = require("../services/WarehouseService");

class WarehouseController {

    async findAll(req, res) {
        try {
            const warehouses = await WarehouseService.findAll();

            return res.status(200).json({
                success: true,
                message: "Warehouse retrieved successfully",
                data: warehouses,
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
            const { id } = req.params;

            const warehouse = await WarehouseService.findById(id);

            return res.status(200).json({
                success: true,
                message: "Warehouse retrieved successfully",
                data: warehouse,
            });

        } catch (error) {

            if (error.message === "Warehouse not found") {
                return res.status(404).json({
                    success: false,
                    message: error.message,
                });
            }

            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }

    async create(req, res) {
        try {

            const warehouse = await WarehouseService.create(req.body);

            return res.status(201).json({
                success: true,
                message: "Warehouse created successfully",
                data: warehouse,
            });

        } catch (error) {

            if (error.message === "Warehouse name already exists") {
                return res.status(409).json({
                    success: false,
                    message: error.message,
                });
            }

            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }

    async update(req, res) {
        try {

            const { id } = req.params;

            const warehouse = await WarehouseService.update(
                id,
                req.body
            );

            return res.status(200).json({
                success: true,
                message: "Warehouse updated successfully",
                data: warehouse,
            });

        } catch (error) {

            if (error.message === "Warehouse not found") {
                return res.status(404).json({
                    success: false,
                    message: error.message,
                });
            }

            if (error.message === "Warehouse name already exists") {
                return res.status(409).json({
                    success: false,
                    message: error.message,
                });
            }

            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }

    async delete(req, res) {
        try {

            const { id } = req.params;

            await WarehouseService.delete(id);

            return res.status(200).json({
                success: true,
                message: "Warehouse deleted successfully",
            });

        } catch (error) {

            if (error.message === "Warehouse not found") {
                return res.status(404).json({
                    success: false,
                    message: error.message,
                });
            }

            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }

}

module.exports = new WarehouseController();