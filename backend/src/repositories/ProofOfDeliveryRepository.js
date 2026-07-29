const {
    ProofOfDelivery,
    DeliveryOrder,
    User,
} = require("../models");

class ProofOfDeliveryRepository {

    async findAll() {
    return await ProofOfDelivery.findAll({
        include: [
            {
                model: DeliveryOrder,
                as: "deliveryOrder",
            },
        ],
        order: [["uploaded_at", "DESC"]],
    });
}

   async findById(id) {
    return await ProofOfDelivery.findByPk(id, {
        include: [
            {
                model: DeliveryOrder,
                as: "deliveryOrder",
            },
        ],
    });
}

    async findByDeliveryOrder(deliveryOrderId) {
        return await ProofOfDelivery.findOne({
            where: {
                delivery_order_id: deliveryOrderId,
            },
        });
    }

    async create(data, transaction = null) {
        return await ProofOfDelivery.create(data, {
            transaction,
        });
    }

    async update(id, data) {
        const proof = await ProofOfDelivery.findByPk(id);

        if (!proof) {
            return null;
        }

        await proof.update(data);

        return proof;
    }

    async delete(id) {
        const proof = await ProofOfDelivery.findByPk(id);

        if (!proof) {
            return null;
        }

        await proof.destroy();

        return true;
    }

}

module.exports = new ProofOfDeliveryRepository();