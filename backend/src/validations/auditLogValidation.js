const { body, validationResult } = require("express-validator");

exports.createAuditLog = [

    body("activity")
        .notEmpty()
        .withMessage("Activity is required")
        .isLength({ min: 5, max: 255 })
        .withMessage("Activity must be between 5 and 255 characters"),

    body("module")
        .notEmpty()
        .withMessage("Module is required")
        .isLength({ min: 3, max: 255 })
        .withMessage("Module must be between 3 and 255 characters"),

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