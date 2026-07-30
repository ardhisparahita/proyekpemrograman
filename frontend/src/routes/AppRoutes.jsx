import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/auth/Login";
import Dashboard from "../pages/dashboard/Dashboard";
import Forbidden from "../pages/Forbidden";

import ProtectedRoute from "./ProtectedRoute";
import RoleRoute from "./RoleRoute";
import WarehousePage from "../pages/warehouses/Index";
import ProductPage from "../pages/products/Index";
import InventoryPage from "../pages/inventories/Index";
import DeliveryOrderPage from "../pages/delivery-orders/Index";
import ValidationPage from "../pages/validations/Index";
import ProofOfDeliveryPage from "../pages/proof-of-deliveries/Index";
import VehicleTrackingPage from "../pages/vehicle-trackings/Index";
import DailyReportPage from "../pages/daily-reports/Index";
import AuditLogPage from "../pages/audit-logs/Index";

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

                <Route path="/warehouses" element={<WarehousePage />} />

<Route path="/products" element={<ProductPage />} />

<Route path="/inventories" element={<InventoryPage />} />

<Route path="/delivery-orders" element={<DeliveryOrderPage />} />

<Route path="/validations" element={<ValidationPage />} />

<Route path="/proof-of-deliveries" element={<ProofOfDeliveryPage />} />

<Route path="/vehicle-trackings" element={<VehicleTrackingPage />} />

<Route path="/daily-reports" element={<DailyReportPage />} />

<Route path="/audit-logs" element={<AuditLogPage />} />

            </Routes>
        </BrowserRouter>
    );
}