import DashboardLayout from "../../layouts/DashboardLayout";
import useAuth from "../../hooks/useAuth";

export default function Dashboard() {

    const { auth } = useAuth();

    return (
        <DashboardLayout>

            <h1 className="text-3xl font-bold">
                Dashboard
            </h1>

            <div className="mt-6 rounded-lg bg-white p-6 shadow">

                <p>
                    Selamat datang
                </p>

                <h2 className="mt-2 text-2xl font-bold">

                    {auth.user?.name}

                </h2>

                <p className="mt-2 text-gray-500">

                    Role :
                    {" "}
                    {auth.user?.role}

                </p>

            </div>

        </DashboardLayout>
    );

}