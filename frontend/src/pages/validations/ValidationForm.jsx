import { useEffect, useState } from "react";

import Button from "../../components/common/Button";

import deliveryOrderService from "../../services/deliveryOrderService";

export default function ValidationForm({
    onSubmit,
    loading,
    initialData = null,
}) {
    const [deliveryOrders, setDeliveryOrders] = useState([]);

    const [form, setForm] = useState({
        delivery_order_id: "",
        validation_status: "VALID",
        notes: "",
    });

    useEffect(() => {
        async function fetchDeliveryOrders() {
            try {
                const response =
                    await deliveryOrderService.getAll();

                setDeliveryOrders(response.data ?? []);
            } catch (error) {
                console.error(error);

                setDeliveryOrders([]);
            }
        }

        void fetchDeliveryOrders();
    }, []);

    useEffect(() => {
        if (initialData) {
            setForm({
                delivery_order_id:
                    initialData.delivery_order_id ?? "",

                validation_status:
                    initialData.validation_status ??
                    "VALID",

                notes:
                    initialData.notes ?? "",
            });

            return;
        }

        setForm({
            delivery_order_id: "",
            validation_status: "VALID",
            notes: "",
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

        onSubmit({
            ...form,
            delivery_order_id: Number(
                form.delivery_order_id
            ),
        });
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-4"
        >
            <div>
                <label className="mb-2 block font-medium">
                    Delivery Order
                </label>

                <select
                    name="delivery_order_id"
                    value={form.delivery_order_id}
                    onChange={handleChange}
                    className="w-full rounded-lg border p-3"
                    required
                >
                    <option value="">
                        Pilih Delivery Order
                    </option>

                    {deliveryOrders.map(
                        (deliveryOrder) => (
                            <option
                                key={deliveryOrder.id}
                                value={
                                    deliveryOrder.id
                                }
                            >
                                {
                                    deliveryOrder.do_number
                                }
                            </option>
                        )
                    )}
                </select>
            </div>

            <div>
                <label className="mb-2 block font-medium">
                    Validation Status
                </label>

                <select
                    name="validation_status"
                    value={form.validation_status}
                    onChange={handleChange}
                    className="w-full rounded-lg border p-3"
                >
                    <option value="VALID">
                        VALID
                    </option>

                    <option value="INVALID">
                        INVALID
                    </option>
                </select>
            </div>

           <div>
    <label className="mb-2 block font-medium">
        Catatan
    </label>

    <textarea
        name="notes"
        value={form.notes}
        onChange={handleChange}
        rows={4}
        className="w-full rounded-lg border p-3"
        placeholder="Masukkan catatan validasi..."
    />
</div>

            <Button
                type="submit"
                disabled={loading}
                className={`w-full ${
                    loading
                        ? "cursor-not-allowed opacity-70"
                        : ""
                }`}
            >
                {loading
                    ? "Menyimpan..."
                    : initialData
                    ? "Update Validation"
                    : "Simpan Validation"}
            </Button>
        </form>
    );
}