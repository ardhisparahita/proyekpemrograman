import { useEffect, useState } from "react";

import Button from "../../components/common/Button";
import Input from "../../components/common/Input";

import deliveryOrderService from "../../services/deliveryOrderService";

export default function ProofOfDeliveryForm({
    onSubmit,
    loading,
    initialData = null,
}) {
    const [deliveryOrders, setDeliveryOrders] =
        useState([]);

    const [form, setForm] = useState({
        delivery_order_id: "",
        photo_url: "",
        signature_url: "",
        received_by: "",
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

                photo_url:
                    initialData.photo_url ?? "",

                signature_url:
                    initialData.signature_url ?? "",

                received_by:
                    initialData.received_by ?? "",
            });

            return;
        }

        setForm({
            delivery_order_id: "",
            photo_url: "",
            signature_url: "",
            received_by: "",
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
                label="Photo URL"
                name="photo_url"
                value={form.photo_url}
                onChange={handleChange}
                required
            />

            <Input
                label="Signature URL"
                name="signature_url"
                value={form.signature_url}
                onChange={handleChange}
                required
            />

            <Input
                label="Received By"
                name="received_by"
                value={form.received_by}
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
                    ? "Update Proof"
                    : "Simpan Proof"}
            </Button>
        </form>
    );
}