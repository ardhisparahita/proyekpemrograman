import { useCallback, useEffect, useState } from "react";

import DashboardLayout from "../../layouts/DashboardLayout";

import deliveryOrderService from "../../services/deliveryOrderService";

import Loading from "../../components/common/Loading";
import EmptyState from "../../components/common/EmptyState";
import Table from "../../components/common/Table";
import Button from "../../components/common/Button";

import DeliveryOrderModal from "./DeliveryOrderModal";
import DeliveryOrderDetail from "./DeliveryOrderDetail";
import formatDate from "../../utils/formatDate";

export default function DeliveryOrderPage() {
    const [deliveryOrders, setDeliveryOrders] = useState([]);

    const [loading, setLoading] = useState(true);

    const [submitLoading, setSubmitLoading] = useState(false);

    const [openModal, setOpenModal] = useState(false);

    const [selectedDeliveryOrder, setSelectedDeliveryOrder] =
        useState(null);

        const [detailOpen, setDetailOpen] =
    useState(false);

    const fetchDeliveryOrders = useCallback(async () => {
        try {
            setLoading(true);

            const response =
                await deliveryOrderService.getAll();

            setDeliveryOrders(response.data ?? []);
        } catch (error) {
            console.error(error);

            setDeliveryOrders([]);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        void fetchDeliveryOrders();
    }, [fetchDeliveryOrders]);


    const handleDelete = async (id) => {
    const confirmed = window.confirm(
        "Apakah Anda yakin ingin menghapus Delivery Order ini?"
    );

    if (!confirmed) {
        return;
    }

    try {
        await deliveryOrderService.delete(id);

        await fetchDeliveryOrders();
    } catch (error) {
        console.error(error);

        alert("Gagal menghapus Delivery Order.");
    }
};

    const handleDetail = async (id) => {
    try {

        const response =
            await deliveryOrderService.getById(id);

        setSelectedDeliveryOrder(
            response.data
        );

        setDetailOpen(true);

    } catch (error) {
        console.error(error);
    }
};

    const handleCreate = async (data) => {
    try {
        setSubmitLoading(true);

        await deliveryOrderService.create(data);

        setOpenModal(false);

        await fetchDeliveryOrders();
    } catch (error) {
        console.error(error);

        alert("Gagal menambahkan Delivery Order.");
    } finally {
        setSubmitLoading(false);
    }
};

    const handleEdit = async (id) => {
    try {
        const response =
            await deliveryOrderService.getById(id);

        setSelectedDeliveryOrder(
            response.data
        );

        setOpenModal(true);
    } catch (error) {
        console.error(error);
    }
};

const handleUpdate = async (data) => {
    try {
        setSubmitLoading(true);

        await deliveryOrderService.update(
            selectedDeliveryOrder.id,
            data
        );

        setOpenModal(false);

        setSelectedDeliveryOrder(null);

        await fetchDeliveryOrders();
    } catch (error) {
        console.error(error);

        alert("Gagal mengupdate Delivery Order.");
    } finally {
        setSubmitLoading(false);
    }
};

   const getStatusClass = (status) => {
    switch (status) {
        case "PENDING":
            return "bg-gray-100 text-gray-700";

        case "PICKING":
            return "bg-yellow-100 text-yellow-700";

        case "ON_DELIVERY":
            return "bg-blue-100 text-blue-700";

        case "COMPLETED":
            return "bg-green-100 text-green-700";

        default:
            return "bg-red-100 text-red-700";
    }
};

    return (
        <DashboardLayout>

            <div className="mb-6 flex items-center justify-between">

                <h1 className="text-3xl font-bold">
                    Delivery Order Management
                </h1>

               <Button
    onClick={() => {
        setSelectedDeliveryOrder(null);

        setOpenModal(true);
    }}
>
                    Tambah Delivery Order
                </Button>

            </div>

            {loading ? (
                <Loading />
            ) : deliveryOrders.length === 0 ? (
                <EmptyState title="Data Delivery Order belum tersedia" />
            ) : (
                <Table>

                    <thead className="bg-gray-100">

                        <tr>

                            <th className="px-4 py-3 text-left">
                                DO Number
                            </th>

                            <th className="px-4 py-3 text-left">
                                Driver
                            </th>

                            <th className="px-4 py-3 text-left">
                                Destination
                            </th>

                            <th className="px-4 py-3 text-left">
                                Delivery Date
                            </th>

                            <th className="px-4 py-3 text-center">
                                Status
                            </th>

                            <th className="px-4 py-3 text-center">
                                Action
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {deliveryOrders.map((deliveryOrder) => (

                            <tr
                                key={deliveryOrder.id}
                                className="border-b hover:bg-gray-50"
                            >

                                <td className="px-4 py-3">
                                    {deliveryOrder.do_number}
                                </td>

                                <td className="px-4 py-3">
                                    {deliveryOrder.driver?.name}
                                </td>

                                <td className="px-4 py-3">
                                    {deliveryOrder.destination}
                                </td>

                                <td className="px-4 py-3">
                                    {formatDate(deliveryOrder.delivery_date)}
                                </td>

                                <span
    className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusClass(
        deliveryOrder.status
    )}`}
>
    {deliveryOrder.status}
</span>

                                <td className="space-x-2 px-4 py-3 text-center">

                                    <Button
    type="button"
    className="bg-yellow-500 hover:bg-yellow-600"
    onClick={() => handleEdit(deliveryOrder.id)}
>
    Edit
</Button>

<Button
    type="button"
    className="bg-blue-500 hover:bg-blue-600"
    onClick={() =>
        handleDetail(deliveryOrder.id)
    }
>
    Detail
</Button>
                                  <Button
    type="button"
    className="ml-2 bg-red-500 hover:bg-red-600"
    onClick={() => handleDelete(deliveryOrder.id)}
>
    Delete
</Button>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </Table>
            )}

          <DeliveryOrderModal
    open={openModal}
    onClose={() => {
        setOpenModal(false);
        setSelectedDeliveryOrder(null);
    }}
    loading={submitLoading}
    initialData={selectedDeliveryOrder}
    onSubmit={
        selectedDeliveryOrder
            ? handleUpdate
            : handleCreate
    }
/>

<DeliveryOrderDetail
    open={detailOpen}
    onClose={() =>
        setDetailOpen(false)
    }
    deliveryOrder={selectedDeliveryOrder}
/>

        </DashboardLayout>
    );
}