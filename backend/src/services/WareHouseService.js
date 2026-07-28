const WarehouseRepository = require("../repositories/WarehouseRepository");

class WarehouseService {

    async findAll() {
        return await WarehouseRepository.findAll();
    }

    async findById(id) {
        const warehouse = await WarehouseRepository.findById(id);

        if (!warehouse) {
            throw new Error("Warehouse not found");
        }

        return warehouse;
    }

    async create(data) {
        // Cek nama warehouse sudah digunakan atau belum
        const existingWarehouse = await WarehouseRepository.findByName(
            data.warehouse_name
        );

        if (existingWarehouse) {
            throw new Error("Warehouse name already exists");
        }

        return await WarehouseRepository.create(data);
    }

    async update(id, data) {
        const warehouse = await WarehouseRepository.findById(id);

        if (!warehouse) {
            throw new Error("Warehouse not found");
        }

        // Cek jika nama warehouse diubah
        if (data.warehouse_name) {
            const existingWarehouse =
                await WarehouseRepository.findByName(data.warehouse_name);

            if (
                existingWarehouse &&
                existingWarehouse.id !== Number(id)
            ) {
                throw new Error("Warehouse name already exists");
            }
        }

        return await WarehouseRepository.update(id, data);
    }

    async delete(id) {
        const warehouse = await WarehouseRepository.findById(id);

        if (!warehouse) {
            throw new Error("Warehouse not found");
        }

        return await WarehouseRepository.delete(id);
    }
}

module.exports = new WarehouseService();