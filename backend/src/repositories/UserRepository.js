const { User } = require("../models");

class UserRepository {

    async findAll() {
        return await User.findAll();
    }

    async findById(id) {
        return await User.findByPk(id);
    }

    async findByEmail(email) {
        return await User.findOne({
            where: {
                email,
            },
        });
    }

    async findDrivers() {
    return await User.findAll({
        where: {
            role: "DRIVER",
        },
        attributes: [
            "id",
            "name",
            "email",
            "phone",
        ],
        order: [
            ["name", "ASC"],
        ],
    });
}

    async create(data) {
        return await User.create(data);
    }

    async update(id, data) {
        const user = await User.findByPk(id);

        if (!user) {
            return null;
        }

        await user.update(data);

        return user;
    }

    async delete(id) {
        const user = await User.findByPk(id);

        if (!user) {
            return null;
        }

        await user.destroy();

        return true;
    }

}

module.exports = new UserRepository();