import { useEffect, useState } from "react";

import Button from "../../components/common/Button";
import Input from "../../components/common/Input";

import deliveryOrderService from "../../services/deliveryOrderService";

export default function VehicleTrackingForm({
    onSubmit,
    loading,
    initialData = null,
}) {
    const [deliveryOrders, setDeliveryOrders] =
        useState([]);

    const [form, setForm] = useState({
        delivery_order_id: "",
        latitude: "",
        longitude: "",
        status: "STARTED",
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

                latitude:
                    initialData.latitude ?? "",

                longitude:
                    initialData.longitude ?? "",

                status:
                    initialData.status ?? "STARTED",
            });

            return;
        }

        setForm({
            delivery_order_id: "",
            latitude: "",
            longitude: "",
            status: "STARTED",
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
            latitude: Number(form.latitude),
            longitude: Number(form.longitude),
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

                    {deliveryOrders.map((delivery) => (
                        <option
                            key={delivery.id}
                            value={delivery.id}
                        >
                            {delivery.do_number}
                        </option>
                    ))}
                </select>
            </div>

            <Input
                label="Latitude"
                type="number"
                step="any"
                name="latitude"
                value={form.latitude}
                onChange={handleChange}
                required
            />

            <Input
                label="Longitude"
                type="number"
                step="any"
                name="longitude"
                value={form.longitude}
                onChange={handleChange}
                required
            />

            <div>
    <label className="mb-2 block font-medium">
        Status
    </label>

    <select
        name="status"
        value={form.status}
        onChange={handleChange}
        className="w-full rounded-lg border p-3"
        required
    >
        <option value="STARTED">
            STARTED
        </option>

        <option value="ON_DELIVERY">
            ON DELIVERY
        </option>

        <option value="ARRIVED">
            ARRIVED
        </option>

        <option value="FINISHED">
            FINISHED
        </option>
    </select>
</div>

            <Button
                type="submit"
                disabled={loading}
                className="w-full"
            >
                {loading
                    ? "Menyimpan..."
                    : initialData
                    ? "Update Tracking"
                    : "Simpan Tracking"}
            </Button>
        </form>
    );
}