const { body, validationResult } = require("express-validator");

const validateInventory = [

    body("warehouse_id")
        .notEmpty()
        .withMessage("Warehouse is required")
        .isInt({ min: 1 })
        .withMessage("Warehouse must be a valid ID"),

    body("product_id")
        .notEmpty()
        .withMessage("Product is required")
        .isInt({ min: 1 })
        .withMessage("Product must be a valid ID"),

    body("stock")
        .notEmpty()
        .withMessage("Stock is required")
        .isInt({ min: 0 })
        .withMessage("Stock must be greater than or equal to 0"),

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

module.exports = validateInventory;