import { saveToken, removeToken } from "../utils/token";
import {
    login as loginApi,
    getDrivers,
} from "../api/authApi";

const authService = {
    async login(data) {
        const response = await loginApi(data);

        saveToken(response.data.token);

        return response.data;
    },

    logout() {
        removeToken();
    },

    async getDrivers() {
    const response = await getDrivers();

    return response.data;
},
    
};

export default authService;