const {
    DeliveryOrder,
    DeliveryOrderItem,
    User,
    Product,
} = require("../models");

class DeliveryOrderRepository {

    async findAll() {
        return await DeliveryOrder.findAll({
            include: [
                {
                    model: User,
                    as: "admin",
                    attributes: ["id", "name", "email"],
                },
                {
                    model: User,
                    as: "driver",
                    attributes: ["id", "name", "email"],
                },
                {
                    model: DeliveryOrderItem,
                    as: "items",
                    include: [
                        {
                            model: Product,
                            as: "product",
                            attributes: [
                                "id",
                                "product_code",
                                "product_name",
                                "barcode",
                                "unit",
                            ],
                        },
                    ],
                },
            ],
            order: [["id", "DESC"]],
        });
    }

    async findById(id) {
        return await DeliveryOrder.findByPk(id, {
            include: [
                {
                    model: User,
                    as: "admin",
                    attributes: ["id", "name", "email"],
                },
                {
                    model: User,
                    as: "driver",
                    attributes: ["id", "name", "email"],
                },
                {
                    model: DeliveryOrderItem,
                    as: "items",
                    include: [
                        {
                            model: Product,
                            as: "product",
                            attributes: [
                                "id",
                                "product_code",
                                "product_name",
                                "barcode",
                                "unit",
                            ],
                        },
                    ],
                },
            ],
        });
    }

    async create(data, transaction) {
        return await DeliveryOrder.create(data, {
            transaction,
        });
    }

    async createItem(data, transaction) {
        return await DeliveryOrderItem.create(data, {
            transaction,
        });
    }

    async update(id, data, transaction = null) {

    const deliveryOrder = await DeliveryOrder.findByPk(id);

    if (!deliveryOrder) {
        return null;
    }

    await deliveryOrder.update(data, {
        transaction,
    });

    return deliveryOrder;
}

    async delete(id) {
        const deliveryOrder = await DeliveryOrder.findByPk(id);

        return await deliveryOrder.destroy();
    }

}

module.exports = new DeliveryOrderRepository();