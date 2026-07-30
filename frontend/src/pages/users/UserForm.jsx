import { useState } from "react";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";

export default function UserForm({ onSubmit, loading }) {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        role: "ADMIN",
        phone: "",
    });

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
        <form onSubmit={handleSubmit} className="space-y-4">
            <Input
                label="Nama"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
            />

            <Input
                label="Email"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
            />

            <Input
                label="Password"
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
            />

            <Input
                label="No. Telepon"
                name="phone"
                value={form.phone}
                onChange={handleChange}
            />

            <div>
                <label className="mb-2 block font-medium">
                    Role
                </label>

                <select
                    name="role"
                    value={form.role}
                    onChange={handleChange}
                    className="w-full rounded-lg border p-3"
                >
                    <option value="ADMIN">ADMIN</option>
                    <option value="WAREHOUSE">WAREHOUSE</option>
                    <option value="DRIVER">DRIVER</option>
                    <option value="OWNER">OWNER</option>
                </select>
            </div>

            <Button
                type="submit"
                disabled={loading}
                className="w-full"
            >
                {loading ? "Menyimpan..." : "Simpan"}
            </Button>
        </form>
    );
}