import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

function Login() {
    const navigate = useNavigate();

    const { login, loading } = useAuth();

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState("");

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");

        try {
            await login(form);

            navigate("/dashboard");
        } catch (err) {
            setError(
                err.response?.data?.message ||
                    "Email atau password salah."
            );
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
                <h1 className="mb-2 text-center text-3xl font-bold">
                    Warehouse Distribution
                </h1>

                <p className="mb-6 text-center text-gray-500">
                    Login ke sistem
                </p>

                {error && (
                    <div className="mb-4 rounded bg-red-100 p-3 text-red-600">
                        {error}
                    </div>
                )}

                <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                >
                    <div>
                        <label className="mb-2 block">
                            Email
                        </label>

                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            className="w-full rounded-lg border p-3 outline-none focus:border-blue-500"
                            placeholder="admin@gmail.com"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block">
                            Password
                        </label>

                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            className="w-full rounded-lg border p-3 outline-none focus:border-blue-500"
                            placeholder="********"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-lg bg-blue-600 p-3 text-white hover:bg-blue-700 disabled:bg-gray-400"
                    >
                        {loading ? "Loading..." : "Login"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;