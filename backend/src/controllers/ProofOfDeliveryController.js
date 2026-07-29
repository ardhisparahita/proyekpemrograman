const ProofOfDeliveryService = require("../services/ProofOfDeliveryService");

class ProofOfDeliveryController {

    async findAll(req, res) {

        try {

            const proofs =
                await ProofOfDeliveryService.findAll();

            return res.status(200).json({
                success: true,
                message: "Proofs of delivery retrieved successfully",
                data: proofs,
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

            const proof =
                await ProofOfDeliveryService.findById(
                    req.params.id
                );

            return res.status(200).json({
                success: true,
                message: "Proof of delivery retrieved successfully",
                data: proof,
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

            const proof =
                await ProofOfDeliveryService.create(
                    req.body
                );

            return res.status(201).json({
                success: true,
                message: "Proof of delivery uploaded successfully",
                data: proof,
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

            await ProofOfDeliveryService.delete(
                req.params.id
            );

            return res.status(200).json({
                success: true,
                message: "Proof of delivery deleted successfully",
            });

        } catch (error) {

            return res.status(404).json({
                success: false,
                message: error.message,
            });

        }

    }

}

module.exports = new ProofOfDeliveryController();