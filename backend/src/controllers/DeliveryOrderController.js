const DeliveryOrderService = require("../services/DeliveryOrderService");

class DeliveryOrderController {

    async findAll(req, res) {
        try {

            const deliveryOrders = await DeliveryOrderService.findAll();

            return res.status(200).json({
                success: true,
                message: "Delivery orders retrieved successfully",
                data: deliveryOrders,
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

            const deliveryOrder = await DeliveryOrderService.findById(id);

            return res.status(200).json({
                success: true,
                message: "Delivery order retrieved successfully",
                data: deliveryOrder,
            });

        } catch (error) {

            if (error.message === "Delivery order not found") {
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

            const adminId = req.user.id;

            const deliveryOrder = await DeliveryOrderService.create(
                adminId,
                req.body
            );

            return res.status(201).json({
                success: true,
                message: "Delivery order created successfully",
                data: deliveryOrder,
            });

        } catch (error) {

            if (
                error.message === "Warehouse not found" ||
                error.message === "Driver not found" ||
                error.message === "Selected user is not a driver" ||
                error.message === "Inventory already exists" ||
                error.message.includes("Inventory not found") ||
                error.message.includes("Insufficient stock")
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

            const deliveryOrder = await DeliveryOrderService.update(
                id,
                req.body
            );

            return res.status(200).json({
                success: true,
                message: "Delivery order updated successfully",
                data: deliveryOrder,
            });

        } catch (error) {

            if (error.message === "Delivery order not found") {
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

    async delete(req, res) {
        try {

            const { id } = req.params;

            await DeliveryOrderService.delete(id);

            return res.status(200).json({
                success: true,
                message: "Delivery order deleted successfully",
            });

        } catch (error) {

            if (error.message === "Delivery order not found") {
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

module.exports = new DeliveryOrderController();