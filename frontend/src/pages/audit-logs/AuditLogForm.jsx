import { useEffect, useState } from "react";

import Button from "../../components/common/Button";
import Input from "../../components/common/Input";

export default function AuditLogForm({
    onSubmit,
    loading,
    initialData = null,
}) {
    const [form, setForm] = useState({
        activity: "",
        module: "",
    });

    useEffect(() => {
        if (initialData) {
            setForm({
                activity:
                    initialData.activity ?? "",

                module:
                    initialData.module ?? "",
            });

            return;
        }

        setForm({
            activity: "",
            module: "",
        });
    }, [initialData]);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
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
                label="Activity"
                name="activity"
                value={form.activity}
                onChange={handleChange}
                placeholder="Contoh: Create Delivery Order"
                required
            />

            <Input
                label="Module"
                name="module"
                value={form.module}
                onChange={handleChange}
                placeholder="Contoh: Delivery Order"
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
                    ? "Update Audit Log"
                    : "Simpan Audit Log"}
            </Button>
        </form>
    );
}