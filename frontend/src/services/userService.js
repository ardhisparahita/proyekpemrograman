import {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
} from "../api/userApi";

const userService = {
    async getAll() {
        const response = await getUsers();
        return response.data;
    },

    async getById(id) {
        const response = await getUser(id);
        return response.data;
    },

    async create(data) {
        const response = await createUser(data);
        return response.data;
    },

    async update(id, data) {
        const response = await updateUser(id, data);
        return response.data;
    },

    async delete(id) {
        const response = await deleteUser(id);
        return response.data;
    },
};

export default userService;