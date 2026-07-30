import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/auth/Login";
import Dashboard from "../pages/dashboard/Dashboard";
import Forbidden from "../pages/Forbidden";

import ProtectedRoute from "./ProtectedRoute";
import RoleRoute from "./RoleRoute";

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>

                {/* Public Routes */}
                <Route
                    path="/"
                    element={<Login />}
                />

                <Route
                    path="/403"
                    element={<Forbidden />}
                />

                {/* Protected Routes */}
                <Route element={<ProtectedRoute />}>

                    {/* Dashboard */}
                    <Route
                        path="/dashboard"
                        element={<Dashboard />}
                    />

                    {/* Admin Only */}
                    <Route
                        element={
                            <RoleRoute
                                allowedRoles={["ADMIN"]}
                            />
                        }
                    >
                        {/* Nanti halaman Users */}
                        {/* <Route path="/users" element={<Users />} /> */}

                        {/* Nanti Warehouse */}
                        {/* <Route path="/warehouses" element={<Warehouse />} /> */}
                    </Route>

                    {/* Owner Only */}
                    <Route
                        element={
                            <RoleRoute
                                allowedRoles={["OWNER"]}
                            />
                        }
                    >
                        {/* Daily Report */}
                    </Route>

                    {/* Warehouse */}
                    <Route
                        element={
                            <RoleRoute
                                allowedRoles={["WAREHOUSE"]}
                            />
                        }
                    >
                        {/* Inventory */}
                    </Route>

                    {/* Driver */}
                    <Route
                        element={
                            <RoleRoute
                                allowedRoles={["DRIVER"]}
                            />
                        }
                    >
                        {/* Delivery */}
                    </Route>

                </Route>

                {/* 404 */}
                <Route
                    path="*"
                    element={
                        <div className="flex h-screen items-center justify-center text-2xl font-bold">
                            404 | Page Not Found
                        </div>
                    }
                />

            </Routes>
        </BrowserRouter>
    );
}