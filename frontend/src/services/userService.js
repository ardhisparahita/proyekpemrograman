import * as userApi from "../api/userApi";

const userService = {

    getAll() {
        return userApi.getUsers();
    },

    getById(id) {
        return userApi.getUser(id);
    },

    create(data) {
        return userApi.createUser(data);
    },

    update(id, data) {
        return userApi.updateUser(id, data);
    },

    delete(id) {
        return userApi.deleteUser(id);
    },

};

export default userService;