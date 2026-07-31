import { useCallback, useEffect, useState } from "react";

import DashboardLayout from "../../layouts/DashboardLayout";

import proofOfDeliveryService from "../../services/proofOfDeliveryService";

import Loading from "../../components/common/Loading";
import EmptyState from "../../components/common/EmptyState";
import Table from "../../components/common/Table";
import Button from "../../components/common/Button";

import ProofOfDeliveryModal from "./ProofOfDeliveryModal";
import ProofOfDeliveryDetail from "./ProofOfDeliveryDetail";

import formatDate from "../../utils/formatDate";

export default function ProofOfDeliveryPage() {
    const [proofs, setProofs] = useState([]);

    const [loading, setLoading] = useState(true);

    const [submitLoading, setSubmitLoading] =
        useState(false);

    const [openModal, setOpenModal] =
        useState(false);

    const [detailOpen, setDetailOpen] =
        useState(false);

    const [selectedProof, setSelectedProof] =
        useState(null);

    const fetchProofs = useCallback(async () => {
        try {
            setLoading(true);

            const response =
                await proofOfDeliveryService.getAll();

            setProofs(response.data ?? []);
        } catch (error) {
            console.error(error);

            setProofs([]);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        void fetchProofs();
    }, [fetchProofs]);
        const handleCreate = async (data) => {
        try {
            setSubmitLoading(true);

            await proofOfDeliveryService.create(data);

            setOpenModal(false);

            await fetchProofs();
        } catch (error) {
            console.error(error);

            alert("Gagal menambahkan Proof of Delivery.");
        } finally {
            setSubmitLoading(false);
        }
    };

    const handleEdit = async (id) => {
        try {
            const response =
                await proofOfDeliveryService.getById(id);

            setSelectedProof(response.data);

            setOpenModal(true);
        } catch (error) {
            console.error(error);
        }
    };

    const handleUpdate = async (data) => {
        try {
            setSubmitLoading(true);

            await proofOfDeliveryService.update(
                selectedProof.id,
                data
            );

            setOpenModal(false);

            setSelectedProof(null);

            await fetchProofs();
        } catch (error) {
            console.error(error);

            alert("Gagal mengubah Proof of Delivery.");
        } finally {
            setSubmitLoading(false);
        }
    };

    const handleDelete = async (id) => {
        const confirmed = window.confirm(
            "Apakah Anda yakin ingin menghapus Proof of Delivery ini?"
        );

        if (!confirmed) {
            return;
        }

        try {
            await proofOfDeliveryService.delete(id);

            await fetchProofs();
        } catch (error) {
            console.error(error);

            alert("Gagal menghapus Proof of Delivery.");
        }
    };

    const handleDetail = async (id) => {
        try {
            const response =
                await proofOfDeliveryService.getById(id);

            setSelectedProof(response.data);

            setDetailOpen(true);
        } catch (error) {
            console.error(error);
        }
    };
        return (
        <DashboardLayout>

            <div className="mb-6 flex items-center justify-between">

                <h1 className="text-3xl font-bold">
                    Proof of Delivery Management
                </h1>

                <div className="space-x-2">

                    <Button
                        className="bg-slate-600 hover:bg-slate-700"
                        onClick={() => fetchProofs()}
                    >
                        Refresh
                    </Button>

                    <Button
                        onClick={() => {
                            setSelectedProof(null);

                            setOpenModal(true);
                        }}
                    >
                        Tambah Proof
                    </Button>

                </div>

            </div>

            {loading ? (
                <Loading />
            ) : proofs.length === 0 ? (
                <EmptyState title="Data Proof of Delivery belum tersedia" />
            ) : (

                <div className="overflow-x-auto">

                    <Table>

                        <thead className="bg-slate-100">

                            <tr>

                                <th className="px-4 py-3 text-left">
                                    DO Number
                                </th>

                                <th className="px-4 py-3 text-left">
                                    Received By
                                </th>

                                <th className="px-4 py-3 text-left">
                                    Uploaded At
                                </th>

                                <th className="px-4 py-3 text-center">
                                    Photo
                                </th>

                                <th className="px-4 py-3 text-center">
                                    Signature
                                </th>

                                <th className="px-4 py-3 text-center">
                                    Action
                                </th>

                            </tr>

                        </thead>

                        <tbody>
                                                        {proofs.map((proof) => (

                                <tr
                                    key={proof.id}
                                    className="border-b hover:bg-gray-50"
                                >

                                    <td className="px-4 py-3">
                                        {proof.deliveryOrder?.do_number}
                                    </td>

                                    <td className="px-4 py-3">
                                        {proof.received_by}
                                    </td>

                                    <td className="px-4 py-3">
                                        {formatDate(
                                            proof.uploaded_at
                                        )}
                                    </td>

                                    <td className="px-4 py-3 text-center">

                                        <a
                                            href={proof.photo_url}
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            <img
                                                src={proof.photo_url}
                                                alt="Proof"
                                                className="mx-auto h-14 w-14 rounded-lg border object-cover hover:opacity-80"
                                            />
                                        </a>

                                    </td>

                                    <td className="px-4 py-3 text-center">

                                        <a
                                            href={proof.signature_url}
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            <img
                                                src={proof.signature_url}
                                                alt="Signature"
                                                className="mx-auto h-14 w-24 rounded-lg border object-contain hover:opacity-80"
                                            />
                                        </a>

                                    </td>

                                    <td className="space-x-2 px-4 py-3 text-center">

                                        <Button
                                            className="bg-blue-500 hover:bg-blue-600"
                                            onClick={() =>
                                                handleDetail(
                                                    proof.id
                                                )
                                            }
                                        >
                                            Detail
                                        </Button>

                                        <Button
                                            className="bg-yellow-500 hover:bg-yellow-600"
                                            onClick={() =>
                                                handleEdit(
                                                    proof.id
                                                )
                                            }
                                        >
                                            Edit
                                        </Button>

                                        <Button
                                            className="bg-red-500 hover:bg-red-600"
                                            onClick={() =>
                                                handleDelete(
                                                    proof.id
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
                        <ProofOfDeliveryModal
                open={openModal}
                onClose={() => {
                    setOpenModal(false);

                    setSelectedProof(null);
                }}
                loading={submitLoading}
                initialData={selectedProof}
                onSubmit={
                    selectedProof
                        ? handleUpdate
                        : handleCreate
                }
            />

            <ProofOfDeliveryDetail
                open={detailOpen}
                onClose={() => {
                    setDetailOpen(false);

                    setSelectedProof(null);
                }}
                proof={selectedProof}
            />

        </DashboardLayout>
    );
}