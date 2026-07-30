import { Link } from "react-router-dom";

export default function Sidebar() {
    return (
        <aside className="w-64 bg-slate-800 text-white">

            <div className="border-b border-slate-700 p-5">

                <h1 className="text-xl font-bold">
                    Warehouse System
                </h1>

            </div>

            <nav className="p-4 space-y-2">

                <Link
                    to="/dashboard"
                    className="block rounded-lg px-3 py-2 hover:bg-slate-700"
                >
                    Dashboard
                </Link>

            </nav>

        </aside>
    );
}