const InventoryRepository = require('../repositories/InventoryRepository');
const WarehouseRepository = require('../repositories/WareHouseRepository');
const ProductRepository = require('../repositories/ProductRepositories');

class InventoryService {

    async findAll() {
        return await InventoryRepository.findAll();
    }

    async findById(id) {

        const inventory = await InventoryRepository.findById(id);

        if (!inventory) {
            throw new Error("Inventory not found");
        }

        return inventory;
    }

    async create(data) {

        const warehouse = await WarehouseRepository.findById(
            data.warehouse_id
        );

        if (!warehouse) {
            throw new Error("Warehouse not found");
        }

        const product = await ProductRepository.findById(
            data.product_id
        );

        if (!product) {
            throw new Error("Product not found");
        }

        const existingInventory =
            await InventoryRepository.findByWarehouseAndProduct(
                data.warehouse_id,
                data.product_id
            );

        if (existingInventory) {
            throw new Error("Inventory already exists");
        }

        if (data.stock < 0) {
            throw new Error("Stock must be greater than or equal to 0");
        }

        return await InventoryRepository.create(data);
    }

    async update(id, data) {

        const inventory = await InventoryRepository.findById(id);

        if (!inventory) {
            throw new Error("Inventory not found");
        }

        if (
            data.stock !== undefined &&
            data.stock < 0
        ) {
            throw new Error("Stock must be greater than or equal to 0");
        }

        return await InventoryRepository.update(id, data);
    }

    async delete(id) {

        const inventory = await InventoryRepository.findById(id);

        if (!inventory) {
            throw new Error("Inventory not found");
        }

        return await InventoryRepository.delete(id);
    }

}

module.exports = new InventoryService();