const { body, validationResult } = require("express-validator");

const validateProduct = [

    body("product_code")
        .trim()
        .notEmpty()
        .withMessage("product code is required")
        .isLength({ min: 3, max: 50 })
        .withMessage("product must be between 3 and 50 characters"),

    body("product_name")
        .trim()
        .notEmpty()
        .withMessage("Product name is required")
        .isLength({ min: 3, max: 100 })
        .withMessage("Product name must be between 3 and 100 characters"),

    body("description")
        .optional()
        .isLength({ max: 255 })
        .withMessage("Description cannot exceed 255 characters"),

    body("price")
        .notEmpty()
        .withMessage("Price is required")
        .isFloat({ gt: 0 })
        .withMessage("Price must be greater than 0"),

    body("unit")
        .trim()
        .notEmpty()
        .withMessage("Unit is required")
        .isLength({ max: 20 })
        .withMessage("Unit cannot exceed 20 characters"),

    body("category")
        .trim()
        .notEmpty()
        .withMessage("Category is required")
        .isLength({ max: 50 })
        .withMessage("Category cannot exceed 50 characters"),

    (req, res, next) => {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(422).json({
                success: false,
                message: "Validation failed",
                errors: errors.array(),
            });
        }

        next();
    }

];

module.exports = validateProduct;