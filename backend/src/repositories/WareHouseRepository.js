const { Warehouse } = require("../models");

class WarehouseRepository {

    async findAll() {
        return await Warehouse.findAll({
            order: [["id", "DESC"]],
        });
    }

    async findById(id) {
        return await Warehouse.findByPk(id);
    }

    async findByName(warehouse_name) {
        return await Warehouse.findOne({
            where: {
                warehouse_name,
            },
        });
    }

    async create(data) {
        return await Warehouse.create(data);
    }

    async update(id, data) {
        const warehouse = await Warehouse.findByPk(id);

        if (!warehouse) {
            return null;
        }

        await warehouse.update(data);

        return warehouse;
    }

    async delete(id) {
        const warehouse = await Warehouse.findByPk(id);

        if (!warehouse) {
            return null;
        }

        await warehouse.destroy();

        return warehouse;
    }
}

module.exports = new WarehouseRepository();