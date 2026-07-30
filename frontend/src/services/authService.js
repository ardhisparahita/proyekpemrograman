import { login as loginApi } from "../api/authApi";
import { saveToken, removeToken } from "../utils/token";

const authService = {
    async login(data) {
        const response = await loginApi(data);

        saveToken(response.data.token);

        return response.data;
    },

    logout() {
        removeToken();
    },
};

export default authService;