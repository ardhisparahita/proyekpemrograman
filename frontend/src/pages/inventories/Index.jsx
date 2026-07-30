import { useCallback, useEffect, useState } from "react";

import DashboardLayout from "../../layouts/DashboardLayout";

import inventoryService from "../../services/inventoryService";

import Loading from "../../components/common/Loading";
import EmptyState from "../../components/common/EmptyState";
import Table from "../../components/common/Table";
import Button from "../../components/common/Button";

import InventoryModal from "./InventoryModal";

export default function InventoryPage() {
    const [inventories, setInventories] = useState([]);

    const [loading, setLoading] = useState(true);

    const [submitLoading, setSubmitLoading] = useState(false);

    const [openModal, setOpenModal] = useState(false);

    const [selectedInventory, setSelectedInventory] =
        useState(null);

    const fetchInventories = useCallback(async () => {
        try {
            setLoading(true);

            const response =
                await inventoryService.getAll();

            setInventories(response.data ?? []);
        } catch (error) {
            console.error(error);

            setInventories([]);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        void fetchInventories();
    }, [fetchInventories]);

    const handleSubmit = async (data) => {
    try {
        setSubmitLoading(true);

        if (selectedInventory) {
            await inventoryService.update(
                selectedInventory.id,
                data
            );
        } else {
            await inventoryService.create(data);
        }

        setOpenModal(false);

        setSelectedInventory(null);

        await fetchInventories();
    } catch (error) {
        console.error(error);

        alert(
            error.response?.data?.message ??
                "Gagal menyimpan inventory."
        );
    } finally {
        setSubmitLoading(false);
    }
};

    const handleDelete = async () => {
        // akan dibuat di bagian berikutnya
    };

    return (
        <DashboardLayout>

            <div className="mb-6 flex items-center justify-between">

                <h1 className="text-3xl font-bold">
                    Inventory Management
                </h1>

                <Button
                    onClick={() => {
                        setSelectedInventory(null);
                        setOpenModal(true);
                    }}
                >
                    Tambah Inventory
                </Button>

            </div>

            {loading ? (
                <Loading />
            ) : inventories.length === 0 ? (
                <EmptyState
                    title="Data inventory belum tersedia"
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
                                Product
                            </th>

                            <th className="px-4 py-3">
                                Stock
                            </th>

                            <th className="px-4 py-3">
                                Action
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {inventories.map((inventory) => (

                            <tr
                                key={inventory.id}
                                className="border-b"
                            >

                                <td className="px-4 py-3">
                                    {inventory.id}
                                </td>

                                <td className="px-4 py-3">
                                    {inventory.warehouse
                                        ?.warehouse_name}
                                </td>

                                <td className="px-4 py-3">
                                    {inventory.product
                                        ?.product_name}
                                </td>

                                <td className="px-4 py-3">
                                    {inventory.stock}
                                </td>

                                <td className="space-x-2 px-4 py-3">

                                    <Button
                                        className="bg-yellow-500 hover:bg-yellow-600"
                                        onClick={() => {
                                            setSelectedInventory(
                                                inventory
                                            );

                                            setOpenModal(true);
                                        }}
                                    >
                                        Edit
                                    </Button>

                                    <Button
                                        className="bg-red-500 hover:bg-red-600"
                                        onClick={() =>
                                            handleDelete(
                                                inventory.id
                                            )
                                        }
                                    >
                                        Delete
                                    </Button>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </Table>
            )}

           <InventoryModal
    open={openModal}
    onClose={() => {
        setOpenModal(false);
        setSelectedInventory(null);
    }}
    loading={submitLoading}
    initialData={selectedInventory}
    onSubmit={handleSubmit}
/>

        </DashboardLayout>
    );
}