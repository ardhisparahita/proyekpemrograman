import { useEffect, useState } from "react";

import warehouseService from "../../services/warehouseService";
import productService from "../../services/productService";

import Button from "../../components/common/Button";
import Input from "../../components/common/Input";

export default function InventoryForm({
    initialData,
    onSubmit,
    loading,
}) {
    const [warehouses, setWarehouses] = useState([]);
    const [products, setProducts] = useState([]);

    const [form, setForm] = useState({
        warehouse_id: "",
        product_id: "",
        stock: "",
    });

    useEffect(() => {
        const loadMasterData = async () => {
            try {
                const [warehouseResponse, productResponse] =
                    await Promise.all([
                        warehouseService.getAll(),
                        productService.getAll(),
                    ]);

                setWarehouses(
                    warehouseResponse.data ?? []
                );

                setProducts(
                    productResponse.data ?? []
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
                warehouse_id:
                    initialData.warehouse_id ?? "",

                product_id:
                    initialData.product_id ?? "",

                stock:
                    initialData.stock ?? "",
            });

            return;
        }

        setForm({
            warehouse_id: "",
            product_id: "",
            stock: "",
        });
    }, [initialData]);

    const handleChange = (event) => {
        setForm((prev) => ({
            ...prev,
            [event.target.name]: event.target.value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        onSubmit({
            warehouse_id: Number(form.warehouse_id),
            product_id: Number(form.product_id),
            stock: Number(form.stock),
        });
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-4"
        >
            <div>
                <label className="mb-2 block font-medium">
                    Warehouse
                </label>

                <select
                    name="warehouse_id"
                    value={form.warehouse_id}
                    onChange={handleChange}
                    className="w-full rounded-lg border p-3"
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
                    Product
                </label>

                <select
                    name="product_id"
                    value={form.product_id}
                    onChange={handleChange}
                    className="w-full rounded-lg border p-3"
                    required
                >
                    <option value="">
                        Pilih Product
                    </option>

                    {products.map((product) => (
                        <option
                            key={product.id}
                            value={product.id}
                        >
                            {product.product_name}
                        </option>
                    ))}
                </select>
            </div>

            <Input
                label="Stock"
                type="number"
                name="stock"
                value={form.stock}
                onChange={handleChange}
                required
            />

            <Button
                type="submit"
                disabled={loading}
                className="w-full"
            >
                {loading
                    ? "Menyimpan..."
                    : initialData
                        ? "Update Inventory"
                        : "Simpan Inventory"}
            </Button>
        </form>
    );
}