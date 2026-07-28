const express = require("express");
const router = express.Router();

const DeliveryOrderController = require('../controllers/DeliveryOrderController');
const validateDeliveryOrder = require('../validations/deliveryOrderValidation');

const auth = require('../middleware/auth');
const authorize = require('../middleware/authorize');

router.get(
    "/",
    auth,
    DeliveryOrderController.findAll
);

router.get(
    "/:id",
    auth,
    DeliveryOrderController.findById
);

router.post(
    "/",
    auth,
    authorize("ADMIN"),
    validateDeliveryOrder,
    DeliveryOrderController.create
);

router.put(
    "/:id",
    auth,
    authorize("ADMIN"),
    DeliveryOrderController.update
);

router.delete(
    "/:id",
    auth,
    authorize("ADMIN"),
    DeliveryOrderController.delete
);

module.exports = router;