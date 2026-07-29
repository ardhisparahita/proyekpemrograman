const { body, validationResult } = require("express-validator");

exports.createProofOfDelivery = [

    body("delivery_order_id")
        .notEmpty()
        .withMessage("Delivery Order is required")
        .isInt({ min: 1 })
        .withMessage("Delivery Order must be a valid ID"),

    body("photo_url")
        .notEmpty()
        .withMessage("Photo URL is required")
        .isString()
        .withMessage("Photo URL must be a string"),

    body("signature_url")
        .notEmpty()
        .withMessage("Signature URL is required")
        .isString()
        .withMessage("Signature URL must be a string"),

    body("received_by")
        .notEmpty()
        .withMessage("Receiver name is required")
        .isLength({ min: 3, max: 100 })
        .withMessage("Receiver name must be between 3 and 100 characters"),

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