const {
    Validation,
    DeliveryOrder,
    User,
} = require("../models");

class ValidationRepository {

    async findAll() {
        return await Validation.findAll({
            include: [
                {
                    model: DeliveryOrder,
                    as: "deliveryOrder",
                },
                {
                    model: User,
                    as: "validator",
                    attributes: ["id", "name", "email", "role"],
                },
            ],
            order: [["validation_time", "DESC"]],
        });
    }

    async findById(id) {
        return await Validation.findByPk(id, {
            include: [
                {
                    model: DeliveryOrder,
                    as: "deliveryOrder",
                },
                {
                    model: User,
                    as: "validator",
                    attributes: ["id", "name", "email", "role"],
                },
            ],
        });
    }

    async findByDeliveryOrder(deliveryOrderId) {
        return await Validation.findOne({
            where: {
                delivery_order_id: deliveryOrderId,
            },
        });
    }

    async create(data, transaction = null) {
        return await Validation.create(data, {
            transaction,
        });
    }

    async update(id, data) {
        const validation = await Validation.findByPk(id);

        if (!validation) {
            return null;
        }

        await validation.update(data);

        return validation;
    }

    async delete(id) {
        const validation = await Validation.findByPk(id);

        if (!validation) {
            return null;
        }

        await validation.destroy();

        return true;
    }

}

module.exports = new ValidationRepository();