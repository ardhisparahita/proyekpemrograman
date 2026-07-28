const sequelize = require("../config/database");

const DeliveryOrderRepository = require('../repositories/DeliveryOrderRepository');
const InventoryRepository = require('../repositories/InventoryRepository');
const WarehouseRepository = require('../repositories/WarehouseRepository');
const UserRepository = require('../repositories/UserRepository');

class DeliveryOrderService {

    async findAll() {
        return await DeliveryOrderRepository.findAll();
    }

    async findById(id) {

        const deliveryOrder = await DeliveryOrderRepository.findById(id);

        if (!deliveryOrder) {
            throw new Error("Delivery order not found");
        }

        return deliveryOrder;
    }

    async create(adminId, data) {

        const transaction = await sequelize.transaction();

        try {

            // Cek Warehouse
            const warehouse =
                await WarehouseRepository.findById(
                    data.warehouse_id
                );

            if (!warehouse) {
                throw new Error("Warehouse not found");
            }

            // Cek Driver
            const driver =
                await UserRepository.findById(
                    data.driver_id
                );

            if (!driver) {
                throw new Error("Driver not found");
            }

            if (driver.role !== "DRIVER") {
                throw new Error("Selected user is not a driver");
            }

            // Buat Delivery Order
            const deliveryOrder =
                await DeliveryOrderRepository.create(
                    {
                        admin_id: adminId,
                        driver_id: data.driver_id,
                        warehouse_id: data.warehouse_id,
                        status: "PENDING",
                        notes: data.notes,
                    },
                    transaction
                );

            // Loop Item
            for (const item of data.items) {

                const inventory =
                    await InventoryRepository.findByWarehouseAndProduct(
                        data.warehouse_id,
                        item.product_id
                    );

                if (!inventory) {
                    throw new Error(
                        `Inventory not found for product ${item.product_id}`
                    );
                }

                if (inventory.stock < item.quantity) {
                    throw new Error(
                        `Insufficient stock for product ${item.product_id}`
                    );
                }

                inventory.stock -= item.quantity;

                await inventory.save({
                    transaction,
                });

                await DeliveryOrderRepository.createItem(
                    {
                        delivery_order_id: deliveryOrder.id,
                        product_id: item.product_id,
                        quantity: item.quantity,
                    },
                    transaction
                );
            }

            await transaction.commit();

            return await DeliveryOrderRepository.findById(
                deliveryOrder.id
            );

        } catch (error) {

            await transaction.rollback();

            throw error;

        }

    }

    async update(id, data) {

        const deliveryOrder =
            await DeliveryOrderRepository.findById(id);

        if (!deliveryOrder) {
            throw new Error("Delivery order not found");
        }

        return await DeliveryOrderRepository.update(
            id,
            data
        );
    }

    async delete(id) {

        const deliveryOrder =
            await DeliveryOrderRepository.findById(id);

        if (!deliveryOrder) {
            throw new Error("Delivery order not found");
        }

        return await DeliveryOrderRepository.delete(id);
    }

}

module.exports = new DeliveryOrderService();