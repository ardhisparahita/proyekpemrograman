const InventoryService = require('../services/InventoryService');

class InventoryController {

    async findAll(req, res) {
        try {

            const inventories = await InventoryService.findAll();

            return res.status(200).json({
                success: true,
                message: "Inventories retrieved successfully",
                data: inventories,
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

            const inventory = await InventoryService.findById(id);

            return res.status(200).json({
                success: true,
                message: "Inventory retrieved successfully",
                data: inventory,
            });

        } catch (error) {

            if (error.message === "Inventory not found") {
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

            const inventory = await InventoryService.create(req.body);

            return res.status(201).json({
                success: true,
                message: "Inventory created successfully",
                data: inventory,
            });

        } catch (error) {

            if (
                error.message === "Warehouse not found" ||
                error.message === "Product not found" ||
                error.message === "Inventory already exists" ||
                error.message === "Stock must be greater than or equal to 0"
            ) {
                return res.status(400).json({
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

            const inventory = await InventoryService.update(
                id,
                req.body
            );

            return res.status(200).json({
                success: true,
                message: "Inventory updated successfully",
                data: inventory,
            });

        } catch (error) {

            if (error.message === "Inventory not found") {
                return res.status(404).json({
                    success: false,
                    message: error.message,
                });
            }

            if (
                error.message === "Stock must be greater than or equal to 0"
            ) {
                return res.status(400).json({
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

            await InventoryService.delete(id);

            return res.status(200).json({
                success: true,
                message: "Inventory deleted successfully",
            });

        } catch (error) {

            if (error.message === "Inventory not found") {
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

module.exports = new InventoryController();