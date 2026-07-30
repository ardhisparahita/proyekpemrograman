import { useEffect, useState } from "react";

import Input from "../../components/common/Input";
import Button from "../../components/common/Button";

export default function ProductForm({
    initialData,
    onSubmit,
    loading,
}) {
   const [form, setForm] = useState({
    product_code: "",
    product_name: "",
    barcode: "",
    price: "",
    unit: "",
    category: "",
});

    useEffect(() => {
    if (initialData) {
        setForm({
            product_code: initialData.product_code ?? "",
            product_name: initialData.product_name ?? "",
            barcode: initialData.barcode ?? "",
            price: initialData.price ?? "",
            unit: initialData.unit ?? "",
            category: initialData.category ?? "",
        });
    } else {
        setForm({
            product_code: "",
            product_name: "",
            barcode: "",
            price: "",
            unit: "",
            category: "",
        });
    }
}, [initialData]);

    const handleChange = (event) => {
        setForm((prev) => ({
            ...prev,
            [event.target.name]: event.target.value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        onSubmit(form);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-4"
        >
            <Input
                label="Product Code"
                name="product_code"
                value={form.product_code}
                onChange={handleChange}
                required
            />

            <Input
                label="Product Name"
                name="product_name"
                value={form.product_name}
                onChange={handleChange}
                required
            />


            <Input
                label="Barcode"
                name="barcode"
                value={form.barcode}
                onChange={handleChange}
                required
            />

            <Input
    label="Price"
    type="number"
    name="price"
    value={form.price}
    onChange={handleChange}
    required
/>

            <Input
                label="Unit"
                name="unit"
                value={form.unit}
                onChange={handleChange}
                required
            />

            <Input
    label="Category"
    name="category"
    value={form.category}
    onChange={handleChange}
    required
/>

            <Button
                type="submit"
                className="w-full"
                disabled={loading}
            >
                {loading
                    ? "Menyimpan..."
                    : initialData
                        ? "Update Product"
                        : "Simpan Product"}
            </Button>
        </form>
    );
}