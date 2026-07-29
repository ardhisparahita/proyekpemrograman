const DailyReportRepository = require("../repositories/DailyReportRepository");
const UserRepository = require("../repositories/UserRepository");

class DailyReportService {

    async findAll() {

        return await DailyReportRepository.findAll();

    }

    async findById(id) {

        const report =
            await DailyReportRepository.findById(id);

        if (!report) {
            throw new Error("Daily report not found");
        }

        return report;

    }

    async create(userId, data) {

        const user =
            await UserRepository.findById(userId);

        if (!user) {
            throw new Error("User not found");
        }

        if (user.role !== "WAREHOUSE") {
            throw new Error("Only warehouse can create daily report");
        }

        return await DailyReportRepository.create({
            user_id: userId,
            report_date: data.report_date,
            description: data.description,
        });

    }

    async update(id, data) {

        const report =
            await DailyReportRepository.findById(id);

        if (!report) {
            throw new Error("Daily report not found");
        }

        return await DailyReportRepository.update(
            id,
            {
                report_date: data.report_date,
                description: data.description,
            }
        );

    }

    async delete(id) {

        const report =
            await DailyReportRepository.findById(id);

        if (!report) {
            throw new Error("Daily report not found");
        }

        return await DailyReportRepository.delete(id);

    }

}

module.exports = new DailyReportService();