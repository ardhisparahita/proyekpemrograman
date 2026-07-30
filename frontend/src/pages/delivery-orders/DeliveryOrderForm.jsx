import { useEffect, useState } from "react";

import warehouseService from "../../services/warehouseService";
import authService from "../../services/authService";

import Input from "../../components/common/Input";
import Button from "../../components/common/Button";

import productService from "../../services/productService";

import DeliveryOrderItem from "./DeliveryOrderItem";

export default function DeliveryOrderForm({
    initialData,
    onSubmit,
    loading,
}) {
    const [warehouses, setWarehouses] = useState([]);

    const [drivers, setDrivers] = useState([]);

    const [form, setForm] = useState({
        do_number: "",
        warehouse_id: "",
        driver_id: "",
        destination: "",
        delivery_date: "",
        notes: "",
    });

    const [products, setProducts] = useState([]);

const [items, setItems] = useState([
    {
        product_id: "",
        quantity: 1,
    },
]);

    useEffect(() => {
        const loadMasterData = async () => {
            try {
                const [
    warehouseResponse,
    driverResponse,
    productResponse,
] = await Promise.all([
    warehouseService.getAll(),
    authService.getDrivers(),
    productService.getAll(),
]);setProducts(
    productResponse.data ?? []
);

                setWarehouses(
                    warehouseResponse.data ?? []
                );

                setDrivers(
                    driverResponse.data ?? []
                );
            } catch (error) {
                console.error(error);
            }
        };

        void loadMasterData();
    }, []);

   useEffect(() => {
    if (initialData) {
        setForm({
            do_number:
                initialData.do_number ?? "",

            warehouse_id:
                initialData.warehouse_id ?? "",

            driver_id:
                initialData.driver_id ?? "",

            destination:
                initialData.destination ?? "",

            delivery_date:
                initialData.delivery_date ?? "",

            notes:
                initialData.notes ?? "",
        });

        setItems(
            initialData.items?.map((item) => ({
                product_id:
                    item.product_id,

                quantity:
                    item.qty ??
                    item.quantity,
            })) ?? []
        );

        return;
    }

    setForm({
        do_number: "",
        warehouse_id: "",
        driver_id: "",
        destination: "",
        delivery_date: "",
        notes: "",
    });

    setItems([
        {
            product_id: "",
            quantity: 1,
        },
    ]);
}, [initialData]);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const addItem = () => {
    setItems((prev) => [
        ...prev,
        {
            product_id: "",
            quantity: 1,
        },
    ]);
};

const removeItem = (index) => {
    setItems((prev) =>
        prev.filter((_, i) => i !== index)
    );
};

const updateItem = (
    index,
    field,
    value
) => {
    setItems((prev) =>
        prev.map((item, i) =>
            i === index
                ? {
                      ...item,
                      [field]: value,
                  }
                : item
        )
    );
};

    const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
        ...form,
        items,
    });
};

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-4"
        >
            <Input
                label="DO Number"
                name="do_number"
                value={form.do_number}
                onChange={handleChange}
                required
            />

            <div>
                <label className="mb-2 block font-medium">
                    Warehouse
                </label>

                <select
                    name="warehouse_id"
                    value={form.warehouse_id}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:outline-none"
                    required
                >
                    <option value="">
                        Pilih Warehouse
                    </option>

                    {warehouses.map((warehouse) => (
                        <option
                            key={warehouse.id}
                            value={warehouse.id}
                        >
                            {warehouse.warehouse_name}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label className="mb-2 block font-medium">
                    Driver
                </label>

                <select
                    name="driver_id"
                    value={form.driver_id}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:outline-none"
                    required
                >
                    <option value="">
                        Pilih Driver
                    </option>

                    {drivers.map((driver) => (
                        <option
                            key={driver.id}
                            value={driver.id}
                        >
                            {driver.name} ({driver.email})
                        </option>
                    ))}
                </select>
            </div>

            <Input
                label="Destination"
                name="destination"
                value={form.destination}
                onChange={handleChange}
                required
            />

            <Input
                label="Delivery Date"
                type="date"
                name="delivery_date"
                value={form.delivery_date}
                onChange={handleChange}
                required
            />

            <div>
                <label className="mb-2 block font-medium">
                    Notes
                </label>

                <textarea
                    name="notes"
                    value={form.notes}
                    onChange={handleChange}
                    rows={4}
                    className="w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:outline-none"
                    placeholder="Masukkan catatan..."
                />
            </div>

                    <hr />

<div>

    <div className="mb-3 flex items-center justify-between">

        <h2 className="text-lg font-semibold">

            Delivery Items

        </h2>

        <Button
            type="button"
            onClick={addItem}
        >
            + Tambah Item
        </Button>

    </div>

    {items.map((item, index) => (

        <DeliveryOrderItem
            key={index}
            index={index}
            item={item}
            products={products}
            onChange={updateItem}
            onRemove={removeItem}
        />

    ))}

</div>

            <Button
                type="submit"
                disabled={loading}
                className="w-full"
            >
                {loading
                    ? "Menyimpan..."
                    : initialData
                      ? "Update Delivery Order"
                      : "Simpan Delivery Order"}
            </Button>
        </form>
    );
}