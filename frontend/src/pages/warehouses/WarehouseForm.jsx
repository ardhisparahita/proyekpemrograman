import { useEffect, useState } from "react";

import Input from "../../components/common/Input";
import Button from "../../components/common/Button";

export default function WarehouseForm({
    initialData,
    onSubmit,
    loading,
}) {
    const [form, setForm] = useState({
        warehouse_name: "",
        address: "",
        city: "",
    });

    useEffect(() => {
        if (initialData) {
            setForm({
                warehouse_name:
                    initialData.warehouse_name ?? "",
                address:
                    initialData.address ?? "",
                city:
                    initialData.city ?? "",
            });
        }
    }, [initialData]);

    const handleChange = (e) => {
        setForm((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        onSubmit(form);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-4"
        >
            <Input
                label="Nama Warehouse"
                name="warehouse_name"
                value={form.warehouse_name}
                onChange={handleChange}
                required
            />

            <Input
                label="Alamat"
                name="address"
                value={form.address}
                onChange={handleChange}
                required
            />

            <Input
                label="Kota"
                name="city"
                value={form.city}
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
                        ? "Update"
                        : "Simpan"}
            </Button>
        </form>
    );
}