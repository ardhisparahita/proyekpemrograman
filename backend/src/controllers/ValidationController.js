const ValidationService = require('../services/ValidationService');

class ValidationController {

    async findAll(req, res) {
        try {

            const validations =
                await ValidationService.findAll();

            return res.status(200).json({
                success: true,
                message: "Validations retrieved successfully",
                data: validations,
            });

        } catch (error) {

            return res.status(500).json({
                success: false,
                message: error.message,
            });

        }
    }

    async findById(req, res) {
        try {

            const validation =
                await ValidationService.findById(
                    req.params.id
                );

            return res.status(200).json({
                success: true,
                message: "Validation retrieved successfully",
                data: validation,
            });

        } catch (error) {

            return res.status(404).json({
                success: false,
                message: error.message,
            });

        }
    }

    async create(req, res) {
        try {

            const validation =
                await ValidationService.create(
                    req.user.id,
                    req.body
                );

            return res.status(201).json({
                success: true,
                message: "Validation created successfully",
                data: validation,
            });

        } catch (error) {

            return res.status(400).json({
                success: false,
                message: error.message,
            });

        }
    }

    async delete(req, res) {
        try {

            await ValidationService.delete(
                req.params.id
            );

            return res.status(200).json({
                success: true,
                message: "Validation deleted successfully",
            });

        } catch (error) {

            return res.status(404).json({
                success: false,
                message: error.message,
            });

        }
    }

}

module.exports = new ValidationController();