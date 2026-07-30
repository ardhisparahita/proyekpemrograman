import useAuth from "../hooks/useAuth";

export default function Navbar() {

    const { auth, logout } = useAuth();

    return (
        <header className="flex h-16 items-center justify-between border-b bg-white px-6">

            <h2 className="text-xl font-semibold">
                Dashboard
            </h2>

            <div className="flex items-center gap-4">

                <div className="text-right">

                    <p className="font-semibold">
                        {auth.user?.name}
                    </p>

                    <p className="text-sm text-gray-500">
                        {auth.user?.role}
                    </p>

                </div>

                <button
                    onClick={logout}
                    className="rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
                >
                    Logout
                </button>

            </div>

        </header>
    );
}