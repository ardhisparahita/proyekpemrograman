const { body, validationResult } = require("express-validator");

const validateDeliveryOrder = [

    body("warehouse_id")
        .notEmpty()
        .withMessage("Warehouse is required")
        .isInt({ min: 1 })
        .withMessage("Warehouse must be a valid ID"),

    body("driver_id")
        .notEmpty()
        .withMessage("Driver is required")
        .isInt({ min: 1 })
        .withMessage("Driver must be a valid ID"),

    body("notes")
        .optional()
        .isString()
        .withMessage("Notes must be a string"),

    body("items")
        .isArray({ min: 1 })
        .withMessage("Items must be a non-empty array"),

    body("items.*.product_id")
        .notEmpty()
        .withMessage("Product is required")
        .isInt({ min: 1 })
        .withMessage("Product ID must be a valid ID"),

    body("items.*.quantity")
        .notEmpty()
        .withMessage("Quantity is required")
        .isInt({ min: 1 })
        .withMessage("Quantity must be greater than 0"),
      
    body("do_number")
    .notEmpty()
    .withMessage("DO Number is required"),

body("destination")
    .notEmpty()
    .withMessage("Destination is required"),

body("delivery_date")
    .notEmpty()
    .withMessage("Delivery date is required")
    .isISO8601()
    .withMessage("Delivery date must be a valid date"),

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

module.exports = validateDeliveryOrder;