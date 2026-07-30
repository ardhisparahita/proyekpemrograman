import { useCallback, useEffect, useState } from "react";

import DashboardLayout from "../../layouts/DashboardLayout";
import userService from "../../services/userService";

import Loading from "../../components/common/Loading";
import EmptyState from "../../components/common/EmptyState";
import Table from "../../components/common/Table";
import Button from "../../components/common/Button";

import UserModal from "./UserModal";

export default function UserList() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [openModal, setOpenModal] = useState(false);

    const fetchUsers = useCallback(async () => {
        try {
            setLoading(true);

            const response = await userService.getAll();

            // Sesuaikan dengan response backend
            setUsers(response.data ?? []);
        } catch (error) {
            console.error("Failed to fetch users:", error);
            setUsers([]);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        void fetchUsers();
    }, [fetchUsers]);

    const handleCreate = async (data) => {
        try {
            setSubmitLoading(true);

            await userService.create(data);

            setOpenModal(false);

            await fetchUsers();
        } catch (error) {
            console.error("Failed to create user:", error);
        } finally {
            setSubmitLoading(false);
        }
    };

    return (
        <DashboardLayout>
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-3xl font-bold">
                    User Management
                </h1>

                <Button onClick={() => setOpenModal(true)}>
                    Tambah User
                </Button>
            </div>

            {loading ? (
                <Loading />
            ) : users.length === 0 ? (
                <EmptyState title="Data user belum tersedia" />
            ) : (
                <Table>
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-3 text-left">
                                ID
                            </th>

                            <th className="px-4 py-3 text-left">
                                Nama
                            </th>

                            <th className="px-4 py-3 text-left">
                                Email
                            </th>

                            <th className="px-4 py-3 text-left">
                                Role
                            </th>

                            <th className="px-4 py-3 text-center">
                                Action
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {users.map((user) => (
                            <tr
                                key={user.id}
                                className="border-b hover:bg-gray-50"
                            >
                                <td className="px-4 py-3">
                                    {user.id}
                                </td>

                                <td className="px-4 py-3">
                                    {user.name}
                                </td>

                                <td className="px-4 py-3">
                                    {user.email}
                                </td>

                                <td className="px-4 py-3">
                                    {user.role}
                                </td>

                                <td className="space-x-2 px-4 py-3 text-center">
                                    <Button className="bg-yellow-500 hover:bg-yellow-600">
                                        Edit
                                    </Button>

                                    <Button className="bg-red-500 hover:bg-red-600">
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}

            <UserModal
                open={openModal}
                onClose={() => setOpenModal(false)}
                loading={submitLoading}
                onSubmit={handleCreate}
            />
        </DashboardLayout>
    );
}