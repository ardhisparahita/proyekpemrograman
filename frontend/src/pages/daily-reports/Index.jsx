import { useCallback, useEffect, useState } from "react";

import DashboardLayout from "../../layouts/DashboardLayout";

import dailyReportService from "../../services/dailyReportService";

import Loading from "../../components/common/Loading";
import EmptyState from "../../components/common/EmptyState";
import Table from "../../components/common/Table";
import Button from "../../components/common/Button";

import DailyReportModal from "./DailyReportModal";
import DailyReportDetail from "./DailyReportDetail";

import formatDate from "../../utils/formatDate";

export default function DailyReportPage() {
    const [reports, setReports] = useState([]);

    const [loading, setLoading] =
        useState(true);

    const [submitLoading, setSubmitLoading] =
        useState(false);

    const [openModal, setOpenModal] =
        useState(false);

    const [detailOpen, setDetailOpen] =
        useState(false);

    const [selectedReport, setSelectedReport] =
        useState(null);

    const fetchReports = useCallback(async () => {
        try {
            setLoading(true);

            const response =
                await dailyReportService.getAll();

            setReports(response.data ?? []);
        } catch (error) {
            console.error(error);

            setReports([]);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        void fetchReports();
    }, [fetchReports]);
        const handleCreate = async (data) => {
        try {
            setSubmitLoading(true);

            await dailyReportService.create(data);

            setOpenModal(false);

            await fetchReports();
        } catch (error) {
            console.error(error);

            alert("Gagal menambahkan Daily Report.");
        } finally {
            setSubmitLoading(false);
        }
    };

    const handleEdit = async (id) => {
        try {
            const response =
                await dailyReportService.getById(id);

            setSelectedReport(response.data);

            setOpenModal(true);
        } catch (error) {
            console.error(error);
        }
    };

    const handleUpdate = async (data) => {
        try {
            setSubmitLoading(true);

            await dailyReportService.update(
                selectedReport.id,
                data
            );

            setOpenModal(false);

            setSelectedReport(null);

            await fetchReports();
        } catch (error) {
            console.error(error);

            alert("Gagal mengubah Daily Report.");
        } finally {
            setSubmitLoading(false);
        }
    };

    const handleDelete = async (id) => {
        const confirmed = window.confirm(
            "Apakah Anda yakin ingin menghapus Daily Report ini?"
        );

        if (!confirmed) {
            return;
        }

        try {
            await dailyReportService.delete(id);

            await fetchReports();
        } catch (error) {
            console.error(error);

            alert("Gagal menghapus Daily Report.");
        }
    };

    const handleDetail = async (id) => {
        try {
            const response =
                await dailyReportService.getById(id);

            setSelectedReport(response.data);

            setDetailOpen(true);
        } catch (error) {
            console.error(error);
        }
    };
        return (
        <DashboardLayout>

            <div className="mb-6 flex items-center justify-between">

                <h1 className="text-3xl font-bold">
                    Daily Report Management
                </h1>

                <div className="space-x-2">

                    <Button
                        className="bg-slate-600 hover:bg-slate-700"
                        onClick={() => fetchReports()}
                    >
                        Refresh
                    </Button>

                    <Button
                        onClick={() => {
                            setSelectedReport(null);

                            setOpenModal(true);
                        }}
                    >
                        Tambah Daily Report
                    </Button>

                </div>

            </div>

            {loading ? (
                <Loading />
            ) : reports.length === 0 ? (
                <EmptyState title="Data Daily Report belum tersedia" />
            ) : (

                <div className="overflow-x-auto">

                    <Table>

                        <thead className="bg-slate-100">

                            <tr>

                                <th className="px-4 py-3 text-left">
                                    Report Date
                                </th>

                                <th className="px-4 py-3 text-left">
                                    User
                                </th>

                                <th className="px-4 py-3 text-left">
                                    Role
                                </th>

                                <th className="px-4 py-3 text-left">
                                    Description
                                </th>

                                <th className="px-4 py-3 text-center">
                                    Action
                                </th>

                            </tr>

                        </thead>

                        <tbody>
                                                        {reports.map((report) => (

                                <tr
                                    key={report.id}
                                    className="border-b hover:bg-gray-50"
                                >

                                    <td className="px-4 py-3">
                                        {formatDate(
                                            report.report_date
                                        )}
                                    </td>

                                    <td className="px-4 py-3">
                                        {report.user?.name}
                                    </td>

                                    <td className="px-4 py-3">
                                        <span className="rounded bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-700">
                                            {report.user?.role}
                                        </span>
                                    </td>

                                    <td className="max-w-sm px-4 py-3">
                                        <p className="truncate">
                                            {report.description}
                                        </p>
                                    </td>

                                    <td className="space-x-2 px-4 py-3 text-center">

                                        <Button
                                            className="bg-blue-500 hover:bg-blue-600"
                                            onClick={() =>
                                                handleDetail(
                                                    report.id
                                                )
                                            }
                                        >
                                            Detail
                                        </Button>

                                        <Button
                                            className="bg-yellow-500 hover:bg-yellow-600"
                                            onClick={() =>
                                                handleEdit(
                                                    report.id
                                                )
                                            }
                                        >
                                            Edit
                                        </Button>

                                        <Button
                                            className="bg-red-500 hover:bg-red-600"
                                            onClick={() =>
                                                handleDelete(
                                                    report.id
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
                        <DailyReportModal
                open={openModal}
                onClose={() => {
                    setOpenModal(false);

                    setSelectedReport(null);
                }}
                loading={submitLoading}
                initialData={selectedReport}
                onSubmit={
                    selectedReport
                        ? handleUpdate
                        : handleCreate
                }
            />

            <DailyReportDetail
                open={detailOpen}
                onClose={() => {
                    setDetailOpen(false);

                    setSelectedReport(null);
                }}
                report={selectedReport}
            />

        </DashboardLayout>
    );
}