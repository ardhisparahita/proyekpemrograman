import { useCallback, useEffect, useState } from "react";

import DashboardLayout from "../../layouts/DashboardLayout";

import warehouseService from "../../services/warehouseService";

import Loading from "../../components/common/Loading";
import EmptyState from "../../components/common/EmptyState";
import Table from "../../components/common/Table";
import Button from "../../components/common/Button";

import WarehouseModal from "./WarehouseModal";


export default function WarehousePage() {
    const [warehouses, setWarehouses] = useState([]);

    const [loading, setLoading] = useState(true);

    const [submitLoading, setSubmitLoading] = useState(false);

const [selectedWarehouse, setSelectedWarehouse] =
    useState(null);

    const handleSubmit = async (data) => {
    try {
        setSubmitLoading(true);

        if (selectedWarehouse) {

            await warehouseService.update(
                selectedWarehouse.id,
                data
            );

        } else {

            await warehouseService.create(data);

        }

        setSelectedWarehouse(null);

        setOpenModal(false);

        await fetchWarehouses();

    } catch (error) {

        console.error(error);

    } finally {

        setSubmitLoading(false);

    }
};

const handleDelete = async (id) => {
    const confirmed = window.confirm(
        "Apakah Anda yakin ingin menghapus warehouse ini?"
    );

    if (!confirmed) {
        return;
    }

    try {
        setLoading(true);

        await warehouseService.delete(id);

        await fetchWarehouses();

        alert("Warehouse berhasil dihapus.");
    } catch (error) {
        console.error(error);

        alert(
            error.response?.data?.message ??
            "Gagal menghapus warehouse."
        );
    } finally {
        setLoading(false);
    }
};

    const [openModal, setOpenModal] = useState(false);

    

    const fetchWarehouses = useCallback(async () => {
        try {
            setLoading(true);

            const response =
                await warehouseService.getAll();

            setWarehouses(response.data ?? []);
        } catch (error) {
            console.error(error);

            setWarehouses([]);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        void fetchWarehouses();
    }, [fetchWarehouses]);

    return (
        <DashboardLayout>

            <div className="mb-6 flex items-center justify-between">

                <h1 className="text-3xl font-bold">
                    Warehouse
                </h1>

                <Button
    onClick={() => {
        setSelectedWarehouse(null);
        setOpenModal(true);
    }}
>
    Tambah Warehouse
</Button>

            </div>

            {loading ? (
                <Loading />
            ) : warehouses.length === 0 ? (
                <EmptyState
                    title="Data warehouse belum tersedia"
                />
            ) : (
                <Table>

                    <thead className="bg-gray-100">
    <tr>

        <th className="px-4 py-3">
            ID
        </th>

        <th className="px-4 py-3">
            Warehouse
        </th>

        <th className="px-4 py-3">
            Address
        </th>

        <th className="px-4 py-3">
            City
        </th>

        <th className="px-4 py-3">
            Action
        </th>

    </tr>
</thead>

                    <tbody>

                        {warehouses.map(
                            (warehouse) => (
                                <tr
                                    key={
                                        warehouse.id
                                    }
                                    className="border-b"
                                >
                                    <td className="px-4 py-3">
                                        {
                                            warehouse.id
                                        }
                                    </td>

                                    <td className="px-4 py-3">
    {warehouse.warehouse_name}
</td>

<td className="px-4 py-3">
    {warehouse.address}
</td>

<td className="px-4 py-3">
    {warehouse.city}
</td>

                                    <td className="space-x-2 px-4 py-3">

                                        <Button
    className="bg-yellow-500 hover:bg-yellow-600"
    onClick={() => {
        setSelectedWarehouse(warehouse);
        setOpenModal(true);
    }}
>
    Edit
</Button>

                                        <Button
    className="bg-red-500 hover:bg-red-600"
    onClick={() => handleDelete(warehouse.id)}
>
    Delete
</Button>

                                    </td>

                                </tr>
                            )
                        )}

                    </tbody>

                </Table>
            )}

           <WarehouseModal
    open={openModal}
    onClose={() => {
        setOpenModal(false);
        setSelectedWarehouse(null);
    }}
    loading={submitLoading}
    initialData={selectedWarehouse}
    onSubmit={handleSubmit}
/>

        </DashboardLayout>
    );
}