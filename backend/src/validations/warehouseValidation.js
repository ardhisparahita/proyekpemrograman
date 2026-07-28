const { body, validationResult } = require("express-validator");

const validateWarehouse = [
    body("warehouse_name")
        .trim()
        .notEmpty()
        .withMessage("Warehouse name is required")
        .isLength({ min: 3, max: 100 })
        .withMessage("Warehouse name must be between 3 and 100 characters"),

    body("address")
        .trim()
        .notEmpty()
        .withMessage("Address is required")
        .isLength({ min: 5 })
        .withMessage("Address must be at least 5 characters"),

    body("city")
        .trim()
        .notEmpty()
        .withMessage("City is required")
        .isLength({ min: 3, max: 100 })
        .withMessage("City must be between 3 and 100 characters"),

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
    },
];

module.exports = validateWarehouse;