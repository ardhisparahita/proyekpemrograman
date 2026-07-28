const { Inventory, Warehouse, Product } = require("../models");

class InventoryRepository {

    async findAll() {
        return await Inventory.findAll({
            include: [
                {
                    model: Warehouse,
                    attributes: ["id", "warehouse_name", "location"],
                },
                {
                    model: Product,
                    attributes: ["id", "product_code", "product_name", "barcode", "unit"],
                },
            ],
        });
    }

    async findById(id) {
        return await Inventory.findByPk(id, {
            include: [
                {
                    model: Warehouse,
                    attributes: ["id", "warehouse_name", "location"],
                },
                {
                    model: Product,
                    attributes: ["id", "product_code", "product_name", "barcode", "unit"],
                },
            ],
        });
    }

    async findByWarehouseAndProduct(warehouse_id, product_id) {
        return await Inventory.findOne({
            where: {
                warehouse_id,
                product_id,
            },
        });
    }

    async create(data) {
        return await Inventory.create(data);
    }

    async update(id, data) {
        const inventory = await Inventory.findByPk(id);

        await inventory.update(data);

        return inventory;
    }

    async delete(id) {
        const inventory = await Inventory.findByPk(id);

        return await inventory.destroy();
    }
}

module.exports = new InventoryRepository();