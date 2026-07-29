const { body, validationResult } = require("express-validator");

exports.createDailyReport = [

    body("report_date")
        .notEmpty()
        .withMessage("Report date is required")
        .isDate()
        .withMessage("Report date must be a valid date"),

    body("description")
        .notEmpty()
        .withMessage("Description is required")
        .isLength({ min: 10 })
        .withMessage("Description must be at least 10 characters"),

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

exports.updateDailyReport = [

    body("report_date")
        .optional()
        .isDate()
        .withMessage("Report date must be a valid date"),

    body("description")
        .optional()
        .isLength({ min: 10 })
        .withMessage("Description must be at least 10 characters"),

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