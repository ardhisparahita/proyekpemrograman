const {
    DailyReport,
    User,
} = require("../models");

class DailyReportRepository {

    async findAll() {
        return await DailyReport.findAll({
            include: [
                {
                    model: User,
                    as: "user",
                    attributes: [
                        "id",
                        "name",
                        "email",
                        "role",
                    ],
                },
            ],
            order: [["report_date", "DESC"]],
        });
    }

    async findById(id) {
        return await DailyReport.findByPk(id, {
            include: [
                {
                    model: User,
                    as: "user",
                    attributes: [
                        "id",
                        "name",
                        "email",
                        "role",
                    ],
                },
            ],
        });
    }

    async create(data, transaction = null) {
        return await DailyReport.create(
            data,
            {
                transaction,
            }
        );
    }

    async update(id, data) {

        const report =
            await DailyReport.findByPk(id);

        if (!report) {
            return null;
        }

        await report.update(data);

        return report;
    }

    async delete(id) {

        const report =
            await DailyReport.findByPk(id);

        if (!report) {
            return null;
        }

        await report.destroy();

        return true;
    }

}

module.exports = new DailyReportRepository();