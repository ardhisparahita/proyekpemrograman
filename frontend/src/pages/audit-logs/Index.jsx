import { useCallback, useEffect, useState } from "react";

import DashboardLayout from "../../layouts/DashboardLayout";

import auditLogService from "../../services/auditLogService";

import Loading from "../../components/common/Loading";
import EmptyState from "../../components/common/EmptyState";
import Table from "../../components/common/Table";
import Button from "../../components/common/Button";

import AuditLogModal from "./AuditLogModal";
import AuditLogDetail from "./AuditLogDetail";

import formatDate from "../../utils/formatDate";

export default function AuditLogPage() {
    const [auditLogs, setAuditLogs] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [submitLoading, setSubmitLoading] =
        useState(false);

    const [openModal, setOpenModal] =
        useState(false);

    const [detailOpen, setDetailOpen] =
        useState(false);

    const [selectedAuditLog, setSelectedAuditLog] =
        useState(null);

    const fetchAuditLogs = useCallback(async () => {
        try {
            setLoading(true);

            const response =
                await auditLogService.getAll();

            setAuditLogs(response.data ?? []);
        } catch (error) {
            console.error(error);

            setAuditLogs([]);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        void fetchAuditLogs();
    }, [fetchAuditLogs]);
        const handleCreate = async (data) => {
        try {
            setSubmitLoading(true);

            await auditLogService.create(data);

            setOpenModal(false);

            await fetchAuditLogs();
        } catch (error) {
            console.error(error);

            alert("Gagal menambahkan Audit Log.");
        } finally {
            setSubmitLoading(false);
        }
    };

    const handleEdit = async (id) => {
        try {
            const response =
                await auditLogService.getById(id);

            setSelectedAuditLog(response.data);

            setOpenModal(true);
        } catch (error) {
            console.error(error);
        }
    };

    const handleUpdate = async (data) => {
        try {
            setSubmitLoading(true);

            await auditLogService.update(
                selectedAuditLog.id,
                data
            );

            setOpenModal(false);

            setSelectedAuditLog(null);

            await fetchAuditLogs();
        } catch (error) {
            console.error(error);

            alert("Gagal mengubah Audit Log.");
        } finally {
            setSubmitLoading(false);
        }
    };

    const handleDelete = async (id) => {
        const confirmed = window.confirm(
            "Apakah Anda yakin ingin menghapus Audit Log ini?"
        );

        if (!confirmed) {
            return;
        }

        try {
            await auditLogService.delete(id);

            await fetchAuditLogs();
        } catch (error) {
            console.error(error);

            alert("Gagal menghapus Audit Log.");
        }
    };

    const handleDetail = async (id) => {
        try {
            const response =
                await auditLogService.getById(id);

            setSelectedAuditLog(response.data);

            setDetailOpen(true);
        } catch (error) {
            console.error(error);
        }
    };
        return (
        <DashboardLayout>

            <div className="mb-6 flex items-center justify-between">

                <h1 className="text-3xl font-bold">
                    Audit Log Management
                </h1>

                <div className="space-x-2">

                    <Button
                        className="bg-slate-600 hover:bg-slate-700"
                        onClick={() => fetchAuditLogs()}
                    >
                        Refresh
                    </Button>

                    <Button
                        onClick={() => {
                            setSelectedAuditLog(null);

                            setOpenModal(true);
                        }}
                    >
                        Tambah Audit Log
                    </Button>

                </div>

            </div>

            {loading ? (
                <Loading />
            ) : auditLogs.length === 0 ? (
                <EmptyState title="Data Audit Log belum tersedia" />
            ) : (

                <div className="overflow-x-auto">

                    <Table>

                        <thead className="bg-slate-100">

                            <tr>

                                <th className="px-4 py-3 text-left">
                                    User
                                </th>

                                <th className="px-4 py-3 text-left">
                                    Activity
                                </th>

                                <th className="px-4 py-3 text-left">
                                    Module
                                </th>

                                <th className="px-4 py-3 text-left">
                                    IP Address
                                </th>

                                <th className="px-4 py-3 text-left">
                                    Created At
                                </th>

                                <th className="px-4 py-3 text-center">
                                    Action
                                </th>

                            </tr>

                        </thead>

                        <tbody>
                                                        {auditLogs.map((auditLog) => (

                                <tr
                                    key={auditLog.id}
                                    className="border-b hover:bg-gray-50"
                                >

                                    <td className="px-4 py-3">
                                        {auditLog.user?.name}
                                    </td>

                                    <td className="px-4 py-3">
                                        {auditLog.activity}
                                    </td>

                                    <td className="px-4 py-3">
                                        {auditLog.module}
                                    </td>

                                    <td className="px-4 py-3">
                                        {auditLog.ip_address}
                                    </td>

                                    <td className="px-4 py-3">
                                        {formatDate(
                                            auditLog.created_at
                                        )}
                                    </td>

                                    <td className="space-x-2 px-4 py-3 text-center">

                                        <Button
                                            className="bg-blue-500 hover:bg-blue-600"
                                            onClick={() =>
                                                handleDetail(
                                                    auditLog.id
                                                )
                                            }
                                        >
                                            Detail
                                        </Button>

                                        <Button
                                            className="bg-yellow-500 hover:bg-yellow-600"
                                            onClick={() =>
                                                handleEdit(
                                                    auditLog.id
                                                )
                                            }
                                        >
                                            Edit
                                        </Button>

                                        <Button
                                            className="bg-red-500 hover:bg-red-600"
                                            onClick={() =>
                                                handleDelete(
                                                    auditLog.id
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
                        <AuditLogModal
                open={openModal}
                onClose={() => {
                    setOpenModal(false);

                    setSelectedAuditLog(null);
                }}
                loading={submitLoading}
                initialData={selectedAuditLog}
                onSubmit={
                    selectedAuditLog
                        ? handleUpdate
                        : handleCreate
                }
            />

            <AuditLogDetail
                open={detailOpen}
                onClose={() => {
                    setDetailOpen(false);

                    setSelectedAuditLog(null);
                }}
                auditLog={selectedAuditLog}
            />

        </DashboardLayout>
    );
}