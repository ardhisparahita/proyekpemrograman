const { body, validationResult } = require("express-validator");

exports.createVehicleTracking = [

    body("delivery_order_id")
        .notEmpty()
        .withMessage("Delivery Order is required")
        .isInt({ min: 1 })
        .withMessage("Delivery Order must be a valid ID"),

    body("latitude")
        .notEmpty()
        .withMessage("Latitude is required")
        .isFloat({
            min: -90,
            max: 90,
        })
        .withMessage("Latitude must be between -90 and 90"),

    body("longitude")
        .notEmpty()
        .withMessage("Longitude is required")
        .isFloat({
            min: -180,
            max: 180,
        })
        .withMessage("Longitude must be between -180 and 180"),

    body("status")
        .notEmpty()
        .withMessage("Status is required")
        .isIn([
            "STARTED",
            "ON_DELIVERY",
            "ARRIVED",
            "FINISHED",
        ])
        .withMessage("Invalid tracking status"),

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