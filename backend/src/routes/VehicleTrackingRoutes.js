const express = require("express");
const router = express.Router();

const VehicleTrackingController = require('../controllers/VehicleTrackingController');

const auth = require('../middleware/auth');
const authorize = require('../middleware/authorize');

const {
    createVehicleTracking,
} = require('../validations/vehicleTrackingValidation');

router.get(
    "/",
    auth,
    authorize("OWNER", "SUPERVISOR", "ADMIN"),
    VehicleTrackingController.findAll
);

router.get(
    "/:id",
    auth,
    authorize("OWNER", "SUPERVISOR", "ADMIN"),
    VehicleTrackingController.findById
);

router.post(
    "/",
    auth,
    authorize("DRIVER"),
    createVehicleTracking,
    VehicleTrackingController.create
);

router.delete(
    "/:id",
    auth,
    authorize("ADMIN"),
    VehicleTrackingController.delete
);

module.exports = router;