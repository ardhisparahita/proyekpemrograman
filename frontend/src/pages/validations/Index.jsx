import { useCallback, useEffect, useState } from "react";

import DashboardLayout from "../../layouts/DashboardLayout";

import validationService from "../../services/validationService";

import Loading from "../../components/common/Loading";
import EmptyState from "../../components/common/EmptyState";
import Table from "../../components/common/Table";
import Button from "../../components/common/Button";

import ValidationModal from "./ValidationModal";
import ValidationDetail from "./ValidationDetail";

import formatDate from "../../utils/formatDate";

export default function ValidationPage() {
    const [validations, setValidations] = useState([]);

    const [loading, setLoading] = useState(true);

    const [submitLoading, setSubmitLoading] =
        useState(false);

    const [openModal, setOpenModal] =
        useState(false);

    const [detailOpen, setDetailOpen] =
        useState(false);

    const [selectedValidation, setSelectedValidation] =
        useState(null);

    const fetchValidations = useCallback(async () => {
        try {
            setLoading(true);

            const response =
                await validationService.getAll();

            setValidations(response.data ?? []);
        } catch (error) {
            console.error(error);

            setValidations([]);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        void fetchValidations();
    }, [fetchValidations]);
        const handleCreate = async (data) => {
        try {
            setSubmitLoading(true);

            await validationService.create(data);

            setOpenModal(false);

            await fetchValidations();
        } catch (error) {
            console.error(error);

            alert("Gagal menambahkan Validation.");
        } finally {
            setSubmitLoading(false);
        }
    };

    const handleEdit = async (id) => {
        try {
            const response =
                await validationService.getById(id);

            setSelectedValidation(response.data);

            setOpenModal(true);
        } catch (error) {
            console.error(error);
        }
    };

    const handleUpdate = async (data) => {
        try {
            setSubmitLoading(true);

            await validationService.update(
                selectedValidation.id,
                data
            );

            setOpenModal(false);

            setSelectedValidation(null);

            await fetchValidations();
        } catch (error) {
            console.error(error);

            alert("Gagal mengubah Validation.");
        } finally {
            setSubmitLoading(false);
        }
    };

    const handleDelete = async (id) => {
        const confirmed = window.confirm(
            "Apakah Anda yakin ingin menghapus Validation ini?"
        );

        if (!confirmed) {
            return;
        }

        try {
            await validationService.delete(id);

            await fetchValidations();
        } catch (error) {
            console.error(error);

            alert("Gagal menghapus Validation.");
        }
    };

    const handleDetail = async (id) => {
        try {
            const response =
                await validationService.getById(id);

            setSelectedValidation(response.data);

            setDetailOpen(true);
        } catch (error) {
            console.error(error);
        }
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case "VALID":
                return (
                    <span className="rounded bg-green-200 px-2 py-1 text-xs font-semibold text-green-800">
                        VALID
                    </span>
                );

            case "INVALID":
                return (
                    <span className="rounded bg-red-200 px-2 py-1 text-xs font-semibold text-red-800">
                        INVALID
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
                    Validation Management
                </h1>

                <div className="space-x-2">

                    <Button
                        className="bg-slate-600 hover:bg-slate-700"
                        onClick={() => fetchValidations()}
                    >
                        Refresh
                    </Button>

                    <Button
                        onClick={() => {
                            setSelectedValidation(null);

                            setOpenModal(true);
                        }}
                    >
                        Tambah Validation
                    </Button>

                </div>

            </div>

            {loading ? (
                <Loading />
            ) : validations.length === 0 ? (
                <EmptyState title="Data Validation belum tersedia" />
            ) : (

                <div className="overflow-x-auto">

                    <Table>

                        <thead className="bg-slate-100">

                            <tr>

                                <th className="px-4 py-3 text-left">
                                    DO Number
                                </th>

                                <th className="px-4 py-3 text-left">
                                    Validator
                                </th>

                                <th className="px-4 py-3 text-left">
                                    Status
                                </th>

                                <th className="px-4 py-3 text-left">
                                    Validation Time
                                </th>

                                <th className="px-4 py-3 text-left">
                                    Notes
                                </th>

                                <th className="px-4 py-3 text-center">
                                    Action
                                </th>

                            </tr>

                        </thead>

                        <tbody>
                            
                                                    {validations.map((validation) => (

                                <tr
                                    key={validation.id}
                                    className="border-b hover:bg-gray-50"
                                >

                                    <td className="px-4 py-3">
                                        {validation.deliveryOrder?.do_number}
                                    </td>

                                    <td className="px-4 py-3">
                                        {validation.validator?.name}
                                    </td>

                                    <td className="px-4 py-3">
                                        {getStatusBadge(
                                            validation.validation_status
                                        )}
                                    </td>

                                    <td className="px-4 py-3">
                                        {formatDate(
                                            validation.validation_time
                                        )}
                                    </td>

                                    <td className="max-w-xs px-4 py-3">
                                        <div className="truncate">
                                            {validation.notes || "-"}
                                        </div>
                                    </td>

                                    <td className="space-x-2 px-4 py-3 text-center">

                                        <Button
                                            className="bg-blue-500 hover:bg-blue-600"
                                            onClick={() =>
                                                handleDetail(
                                                    validation.id
                                                )
                                            }
                                        >
                                            Detail
                                        </Button>

                                        <Button
                                            className="bg-yellow-500 hover:bg-yellow-600"
                                            onClick={() =>
                                                handleEdit(
                                                    validation.id
                                                )
                                            }
                                        >
                                            Edit
                                        </Button>

                                        <Button
                                            className="bg-red-500 hover:bg-red-600"
                                            onClick={() =>
                                                handleDelete(
                                                    validation.id
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
                        <ValidationModal
                open={openModal}
                onClose={() => {
                    setOpenModal(false);

                    setSelectedValidation(null);
                }}
                loading={submitLoading}
                initialData={selectedValidation}
                onSubmit={
                    selectedValidation
                        ? handleUpdate
                        : handleCreate
                }
            />

            <ValidationDetail
                open={detailOpen}
                onClose={() => {
                    setDetailOpen(false);

                    setSelectedValidation(null);
                }}
                validation={selectedValidation}
            />

        </DashboardLayout>
    );
}