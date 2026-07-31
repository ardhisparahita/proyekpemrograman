import { useEffect, useState } from "react";

import Button from "../../components/common/Button";
import Input from "../../components/common/Input";

export default function DailyReportForm({
    onSubmit,
    loading,
    initialData = null,
}) {
    const [form, setForm] = useState({
        report_date: "",
        description: "",
    });

    useEffect(() => {
        if (initialData) {
            setForm({
                report_date:
                    initialData.report_date ?? "",

                description:
                    initialData.description ?? "",
            });

            return;
        }

        setForm({
            report_date: "",
            description: "",
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
                label="Report Date"
                type="date"
                name="report_date"
                value={form.report_date}
                onChange={handleChange}
                required
            />

            <div>
                <label className="mb-2 block font-medium">
                    Description
                </label>

                <textarea
                    name="description"
                    rows={5}
                    value={form.description}
                    onChange={handleChange}
                    className="w-full rounded-lg border p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Masukkan laporan kegiatan harian..."
                    required
                />
            </div>

            <Button
                type="submit"
                disabled={loading}
                className="w-full"
            >
                {loading
                    ? "Menyimpan..."
                    : initialData
                    ? "Update Report"
                    : "Simpan Report"}
            </Button>
        </form>
    );
}