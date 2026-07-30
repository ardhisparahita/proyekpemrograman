import useAuth from "../../hooks/useAuth";

export default function Dashboard() {

    const { user, logout } = useAuth();

    return (
        <div className="p-10">

            <h1 className="text-3xl font-bold">
                Dashboard
            </h1>

            <p className="mt-4">
                Selamat datang,
                {" "}
                {user?.name}
            </p>

            <p>
                Role :
                {" "}
                {user?.role}
            </p>

            <button
                onClick={logout}
                className="mt-6 rounded bg-red-600 px-5 py-2 text-white"
            >
                Logout
            </button>

        </div>
    );

}