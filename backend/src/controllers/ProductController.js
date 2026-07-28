const ProductService = require("../services/ProductService");

class ProductController {

    async findAll(req, res) {
        try {
            const products = await ProductService.findAll();

            return res.status(200).json({
                success: true,
                message: "Products retrieved successfully",
                data: products,
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
            const { id } = req.params;

            const product = await ProductService.findById(id);

            return res.status(200).json({
                success: true,
                message: "Product retrieved successfully",
                data: product,
            });

        } catch (error) {

            if (error.message === "Product not found") {
                return res.status(404).json({
                    success: false,
                    message: error.message,
                });
            }

            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }

    async create(req, res) {
        try {

            const product = await ProductService.create(req.body);

            return res.status(201).json({
                success: true,
                message: "Product created successfully",
                data: product,
            });

        } catch (error) {

            if (
                error.message === "SKU already exists" ||
                error.message === "Price must be greater than 0"
            ) {
                return res.status(400).json({
                    success: false,
                    message: error.message,
                });
            }

            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }

    async update(req, res) {
        try {

            const { id } = req.params;

            const product = await ProductService.update(
                id,
                req.body
            );

            return res.status(200).json({
                success: true,
                message: "Product updated successfully",
                data: product,
            });

        } catch (error) {

            if (error.message === "Product not found") {
                return res.status(404).json({
                    success: false,
                    message: error.message,
                });
            }

            if (
                error.message === "SKU already exists" ||
                error.message === "Price must be greater than 0"
            ) {
                return res.status(400).json({
                    success: false,
                    message: error.message,
                });
            }

            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }

    async delete(req, res) {
        try {

            const { id } = req.params;

            await ProductService.delete(id);

            return res.status(200).json({
                success: true,
                message: "Product deleted successfully",
            });

        } catch (error) {

            if (error.message === "Product not found") {
                return res.status(404).json({
                    success: false,
                    message: error.message,
                });
            }

            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }

}

module.exports = new ProductController();