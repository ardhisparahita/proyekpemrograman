import { NavLink } from "react-router-dom";

const menus = [
    {
        title: "Dashboard",
        path: "/dashboard",
    },
    {
        title: "User",
        path: "/users",
    },
    {
        title: "Warehouse",
        path: "/warehouses",
    },
    {
        title: "Product",
        path: "/products",
    },
    {
        title: "Inventory",
        path: "/inventories",
    },
    {
        title: "Delivery Order",
        path: "/delivery-orders",
    },
    {
        title: "Validation",
        path: "/validations",
    },
    {
        title: "Proof of Delivery",
        path: "/proof-of-deliveries",
    },
    {
        title: "Vehicle Tracking",
        path: "/vehicle-trackings",
    },
    {
        title: "Daily Report",
        path: "/daily-reports",
    },
    {
        title: "Audit Log",
        path: "/audit-logs",
    },
];

export default function Sidebar() {
    return (
        <aside className="h-screen w-64 bg-slate-800 text-white">
            <div className="border-b border-slate-700 p-6">
                <h1 className="text-2xl font-bold">
                    Warehouse System
                </h1>
            </div>

            <nav className="mt-4 flex flex-col">
                {menus.map((menu) => (
                    <NavLink
                        key={menu.path}
                        to={menu.path}
                        className={({ isActive }) =>
                            `mx-3 mb-2 rounded-lg px-4 py-3 transition ${
                                isActive
                                    ? "bg-blue-600"
                                    : "hover:bg-slate-700"
                            }`
                        }
                    >
                        {menu.title}
                    </NavLink>
                ))}
            </nav>
        </aside>
    );
}