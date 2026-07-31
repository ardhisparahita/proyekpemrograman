import { useMemo, useState } from "react";
import AuthContext from "./AuthContext";
import authService from "../services/authService";
import { getToken } from "../utils/token";

export default function AuthProvider({ children }) {
    const [auth, setAuth] = useState(() => ({
        token: getToken(),
        user: null,
    }));

    const [loading, setLoading] = useState(false);

    const login = async (credentials) => {
        setLoading(true);

        try {
            const response = await authService.login(credentials);

            setAuth({
                token: response.token,
                user: response.user,
            });

            return response;
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        authService.logout();

        setAuth({
            token: null,
            user: null,
        });
    };

    const value = useMemo(
        () => ({
            auth,
            user: auth.user,
            token: auth.token,
            loading,
            isAuthenticated: !!auth.token,
            login,
            logout,
        }),
        [auth, loading]
    );

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}