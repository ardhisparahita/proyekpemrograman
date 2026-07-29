const sequelize = require("../config/database");

const ValidationRepository = require('../repositories/ValidationRepository');
const DeliveryOrderRepository = require('../repositories/DeliveryOrderRepository');

class ValidationService {

    async findAll() {
        return await ValidationRepository.findAll();
    }

    async findById(id) {

        const validation = await ValidationRepository.findById(id);

        if (!validation) {
            throw new Error("Validation not found");
        }

        return validation;
    }

    async create(userId, data) {

        const transaction = await sequelize.transaction();

        try {

            const deliveryOrder =
                await DeliveryOrderRepository.findById(
                    data.delivery_order_id
                );

            if (!deliveryOrder) {
                throw new Error("Delivery Order not found");
            }

            const existingValidation =
                await ValidationRepository.findByDeliveryOrder(
                    data.delivery_order_id
                );

            if (existingValidation) {
                throw new Error("Delivery Order has already been validated");
            }

            const validation =
                await ValidationRepository.create(
                    {
                        delivery_order_id: data.delivery_order_id,
                        validated_by: userId,
                        validation_status: data.validation_status,
                        notes: data.notes,
                    },
                    transaction
                );

            let deliveryStatus;

            if (data.validation_status === "VALID") {
                deliveryStatus = "PICKING";
            } else {
                deliveryStatus = "CANCELLED";
            }

            await DeliveryOrderRepository.update(
                data.delivery_order_id,
                {
                    status: deliveryStatus,
                },
                transaction
            );

            await transaction.commit();

            return await ValidationRepository.findById(
                validation.id
            );

        } catch (error) {

            await transaction.rollback();
            throw error;

        }
    }

    async delete(id) {

        const validation =
            await ValidationRepository.findById(id);

        if (!validation) {
            throw new Error("Validation not found");
        }

        return await ValidationRepository.delete(id);
    }

}

module.exports = new ValidationService();