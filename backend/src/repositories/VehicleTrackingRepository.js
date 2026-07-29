const {
    VehicleTracking,
    DeliveryOrder,
    User,
} = require("../models");

class VehicleTrackingRepository {

    async findAll() {
        return await VehicleTracking.findAll({
            include: [
                {
                    model: DeliveryOrder,
                    as: "deliveryOrder",
                },
                {
                    model: User,
                    as: "driver",
                    attributes: ["id", "name", "email"],
                },
            ],
            order: [["tracking_time", "DESC"]],
        });
    }

    async findById(id) {
        return await VehicleTracking.findByPk(id, {
            include: [
                {
                    model: DeliveryOrder,
                    as: "deliveryOrder",
                },
                {
                    model: User,
                    as: "driver",
                    attributes: ["id", "name", "email"],
                },
            ],
        });
    }

    async create(data, transaction = null) {
        return await VehicleTracking.create(data, {
            transaction,
        });
    }

    async update(id, data) {
        const tracking = await VehicleTracking.findByPk(id);

        if (!tracking) {
            return null;
        }

        await tracking.update(data);

        return tracking;
    }

    async delete(id) {
        const tracking = await VehicleTracking.findByPk(id);

        if (!tracking) {
            return null;
        }

        await tracking.destroy();

        return true;
    }

}

module.exports = new VehicleTrackingRepository();