const sequelize = require("../config/database");

const ProofOfDeliveryRepository = require('../repositories/ProofOfDeliveryRepository');
const DeliveryOrderRepository = require('../repositories/DeliveryOrderRepository');

class ProofOfDeliveryService {

    async findAll() {
        return await ProofOfDeliveryRepository.findAll();
    }

    async findById(id) {

        const proof = await ProofOfDeliveryRepository.findById(id);

        if (!proof) {
            throw new Error("Proof of delivery not found");
        }

        return proof;
    }

    async create(data) {

        const transaction = await sequelize.transaction();

        try {

            const deliveryOrder =
                await DeliveryOrderRepository.findById(
                    data.delivery_order_id
                );

            if (!deliveryOrder) {
                throw new Error("Delivery order not found");
            }

            const existing =
                await ProofOfDeliveryRepository.findByDeliveryOrder(
                    data.delivery_order_id
                );

            if (existing) {
                throw new Error("Proof of delivery already exists");
            }

            const proof =
                await ProofOfDeliveryRepository.create(
                    {
                        delivery_order_id: data.delivery_order_id,
                        photo_url: data.photo_url,
                        signature_url: data.signature_url,
                        received_by: data.received_by,
                    },
                    transaction
                );

            await deliveryOrder.update(
                {
                    status: "COMPLETED",
                },
                {
                    transaction,
                }
            );

            await transaction.commit();

            return await ProofOfDeliveryRepository.findById(
                proof.id
            );

        } catch (error) {

            await transaction.rollback();
            throw error;

        }

    }

    async delete(id) {

        const proof =
            await ProofOfDeliveryRepository.findById(id);

        if (!proof) {
            throw new Error("Proof of delivery not found");
        }

        return await ProofOfDeliveryRepository.delete(id);
    }

}

module.exports = new ProofOfDeliveryService();