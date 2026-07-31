import { useCallback, useEffect, useState } from "react";

import DashboardLayout from "../../layouts/DashboardLayout";

import vehicleTrackingService from "../../services/vehicleTrackingService";

import Loading from "../../components/common/Loading";
import EmptyState from "../../components/common/EmptyState";
import Table from "../../components/common/Table";
import Button from "../../components/common/Button";

import VehicleTrackingModal from "./VehicleTrackingModal";
import VehicleTrackingDetail from "./VehicleTrackingDetail";

import formatDate from "../../utils/formatDate";

export default function VehicleTrackingPage() {
    const [trackings, setTrackings] = useState([]);

    const [loading, setLoading] = useState(true);

    const [submitLoading, setSubmitLoading] =
        useState(false);

    const [openModal, setOpenModal] =
        useState(false);

    const [detailOpen, setDetailOpen] =
        useState(false);

    const [selectedTracking, setSelectedTracking] =
        useState(null);

    const fetchTrackings = useCallback(async () => {
        try {
            setLoading(true);

            const response =
                await vehicleTrackingService.getAll();

            setTrackings(response.data ?? []);
        } catch (error) {
            console.error(error);

            setTrackings([]);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        void fetchTrackings();
    }, [fetchTrackings]);
        const handleCreate = async (data) => {
        try {
            setSubmitLoading(true);

            await vehicleTrackingService.create(data);

            setOpenModal(false);

            await fetchTrackings();
        } catch (error) {
            console.error(error);

            alert("Gagal menambahkan Vehicle Tracking.");
        } finally {
            setSubmitLoading(false);
        }
    };

    const handleEdit = async (id) => {
        try {
            const response =
                await vehicleTrackingService.getById(id);

            setSelectedTracking(response.data);

            setOpenModal(true);
        } catch (error) {
            console.error(error);
        }
    };

    const handleUpdate = async (data) => {
        try {
            setSubmitLoading(true);

            await vehicleTrackingService.update(
                selectedTracking.id,
                data
            );

            setOpenModal(false);

            setSelectedTracking(null);

            await fetchTrackings();
        } catch (error) {
            console.error(error);

            alert("Gagal mengubah Vehicle Tracking.");
        } finally {
            setSubmitLoading(false);
        }
    };

    const handleDelete = async (id) => {
        const confirmed = window.confirm(
            "Apakah Anda yakin ingin menghapus Vehicle Tracking ini?"
        );

        if (!confirmed) {
            return;
        }

        try {
            await vehicleTrackingService.delete(id);

            await fetchTrackings();
        } catch (error) {
            console.error(error);

            alert("Gagal menghapus Vehicle Tracking.");
        }
    };

    const handleDetail = async (id) => {
        try {
            const response =
                await vehicleTrackingService.getById(id);

            setSelectedTracking(response.data);

            setDetailOpen(true);
        } catch (error) {
            console.error(error);
        }
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case "STARTED":
                return (
                    <span className="rounded bg-gray-200 px-2 py-1 text-xs font-semibold text-gray-800">
                        STARTED
                    </span>
                );

            case "ON_DELIVERY":
                return (
                    <span className="rounded bg-blue-200 px-2 py-1 text-xs font-semibold text-blue-800">
                        ON DELIVERY
                    </span>
                );

            case "ARRIVED":
                return (
                    <span className="rounded bg-yellow-200 px-2 py-1 text-xs font-semibold text-yellow-800">
                        ARRIVED
                    </span>
                );

            case "FINISHED":
                return (
                    <span className="rounded bg-green-200 px-2 py-1 text-xs font-semibold text-green-800">
                        FINISHED
                    </span>
                );

            default:
                return (
                    <span className="rounded bg-gray-200 px-2 py-1 text-xs font-semibold">
                        {status}
                    </span>
                );
        }
    };
        return (
        <DashboardLayout>

            <div className="mb-6 flex items-center justify-between">

                <h1 className="text-3xl font-bold">
                    Vehicle Tracking Management
                </h1>

                <div className="space-x-2">

                    <Button
                        className="bg-slate-600 hover:bg-slate-700"
                        onClick={() => fetchTrackings()}
                    >
                        Refresh
                    </Button>

                    <Button
                        onClick={() => {
                            setSelectedTracking(null);

                            setOpenModal(true);
                        }}
                    >
                        Tambah Tracking
                    </Button>

                </div>

            </div>

            {loading ? (
                <Loading />
            ) : trackings.length === 0 ? (
                <EmptyState title="Data Vehicle Tracking belum tersedia" />
            ) : (

                <div className="overflow-x-auto">

                    <Table>

                        <thead className="bg-slate-100">

                            <tr>

                                <th className="px-4 py-3 text-left">
                                    DO Number
                                </th>

                                <th className="px-4 py-3 text-left">
                                    Driver
                                </th>

                                <th className="px-4 py-3 text-left">
                                    Latitude
                                </th>

                                <th className="px-4 py-3 text-left">
                                    Longitude
                                </th>

                                <th className="px-4 py-3 text-center">
                                    Status
                                </th>

                                <th className="px-4 py-3 text-left">
                                    Tracking Time
                                </th>

                                <th className="px-4 py-3 text-center">
                                    Action
                                </th>

                            </tr>

                        </thead>

                        <tbody>
                                                        {trackings.map((tracking) => (

                                <tr
                                    key={tracking.id}
                                    className="border-b hover:bg-gray-50"
                                >

                                    <td className="px-4 py-3">
                                        {tracking.deliveryOrder?.do_number}
                                    </td>

                                    <td className="px-4 py-3">
                                        {tracking.driver?.name}
                                    </td>

                                    <td className="px-4 py-3">
                                        {tracking.latitude}
                                    </td>

                                    <td className="px-4 py-3">
                                        {tracking.longitude}
                                    </td>

                                    <td className="px-4 py-3 text-center">
                                        {getStatusBadge(
                                            tracking.status
                                        )}
                                    </td>

                                    <td className="px-4 py-3">
                                        {formatDate(
                                            tracking.tracking_time
                                        )}
                                    </td>

                                    <td className="space-x-2 px-4 py-3 text-center">

                                        <Button
                                            className="bg-blue-500 hover:bg-blue-600"
                                            onClick={() =>
                                                handleDetail(
                                                    tracking.id
                                                )
                                            }
                                        >
                                            Detail
                                        </Button>

                                        <Button
                                            className="bg-yellow-500 hover:bg-yellow-600"
                                            onClick={() =>
                                                handleEdit(
                                                    tracking.id
                                                )
                                            }
                                        >
                                            Edit
                                        </Button>

                                        <Button
                                            className="bg-red-500 hover:bg-red-600"
                                            onClick={() =>
                                                handleDelete(
                                                    tracking.id
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

                </div>

            )}
                        <VehicleTrackingModal
                open={openModal}
                onClose={() => {
                    setOpenModal(false);

                    setSelectedTracking(null);
                }}
                loading={submitLoading}
                initialData={selectedTracking}
                onSubmit={
                    selectedTracking
                        ? handleUpdate
                        : handleCreate
                }
            />

            <VehicleTrackingDetail
                open={detailOpen}
                onClose={() => {
                    setDetailOpen(false);

                    setSelectedTracking(null);
                }}
                tracking={selectedTracking}
            />

        </DashboardLayout>
    );
}