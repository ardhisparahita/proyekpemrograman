const sequelize = require("../config/database");

const VehicleTrackingRepository = require('../repositories/VehicleTrackingRepository');
const DeliveryOrderRepository = require('../repositories/DeliveryOrderRepository');
const UserRepository = require('../repositories/UserRepository');

class VehicleTrackingService {

    async findAll() {
        return await VehicleTrackingRepository.findAll();
    }

    async findById(id) {

        const tracking =
            await VehicleTrackingRepository.findById(id);

        if (!tracking) {
            throw new Error("Vehicle tracking not found");
        }

        return tracking;
    }

    async create(driverId, data) {

    const transaction = await sequelize.transaction();

    try {

        const deliveryOrder =
            await DeliveryOrderRepository.findById(
                data.delivery_order_id
            );

        if (!deliveryOrder) {
            throw new Error("Delivery order not found");
        }

        const driver =
            await UserRepository.findById(driverId);

        if (!driver) {
            throw new Error("Driver not found");
        }

        if (driver.role !== "DRIVER") {
            throw new Error("User is not a driver");
        }

        const tracking =
            await VehicleTrackingRepository.create(
                {
                    driver_id: driverId,
                    delivery_order_id: data.delivery_order_id,
                    latitude: data.latitude,
                    longitude: data.longitude,
                    status: data.status,
                    tracking_time: new Date(),
                },
                transaction
            );

        if (
            data.status === "ON_DELIVERY" &&
            deliveryOrder.status === "PICKING"
        ) {
            await deliveryOrder.update(
                {
                    status: "ON_DELIVERY",
                },
                {
                    transaction,
                }
            );
        }

        if (
            data.status === "FINISHED"
        ) {
            await deliveryOrder.update(
                {
                    status: "COMPLETED",
                },
                {
                    transaction,
                }
            );
        }

        await transaction.commit();

        return await VehicleTrackingRepository.findById(
            tracking.id
        );

    } catch (error) {

        await transaction.rollback();

        throw error;

    }

    const deliveryOrder =
    await DeliveryOrderRepository.findById(
        data.delivery_order_id
    );

if (!deliveryOrder) {
    throw new Error("Delivery order not found");
}

if (deliveryOrder.status === "COMPLETED") {
    throw new Error(
        "Delivery order has been completed"
    );
}

if (deliveryOrder.status === "CANCELLED") {
    throw new Error(
        "Delivery order has been cancelled"
    );
}

}

    async delete(id) {

        const tracking =
            await VehicleTrackingRepository.findById(id);

        if (!tracking) {
            throw new Error("Vehicle tracking not found");
        }

        return await VehicleTrackingRepository.delete(id);
    }

}

module.exports = new VehicleTrackingService();