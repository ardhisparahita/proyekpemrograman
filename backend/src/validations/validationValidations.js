const { body, validationResult } = require("express-validator");

exports.createValidation = [

    body("delivery_order_id")
        .notEmpty()
        .withMessage("Delivery Order is required")
        .isInt({ min: 1 })
        .withMessage("Delivery Order ID must be a positive integer"),

    body("validation_status")
        .notEmpty()
        .withMessage("Validation status is required")
        .isIn(["VALID", "INVALID"])
        .withMessage("Validation status must be VALID or INVALID"),

    body("notes")
        .optional()
        .isLength({ max: 500 })
        .withMessage("Notes cannot exceed 500 characters"),

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