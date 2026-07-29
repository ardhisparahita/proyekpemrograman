const express = require("express");
const router = express.Router();

const ProofOfDeliveryController = require('../controllers/ProofOfDeliveryController');

const auth = require('../middleware/auth');
const authorize = require('../middleware/authorize');

const {
    createProofOfDelivery,
} = require('../validations/proofofdeliveryValidation');

router.get(
    "/",
    auth,
    authorize("OWNER", "SUPERVISOR", "ADMIN"),
    ProofOfDeliveryController.findAll
);

router.get(
    "/:id",
    auth,
    authorize("OWNER", "SUPERVISOR", "ADMIN"),
    ProofOfDeliveryController.findById
);

router.post(
    "/",
    auth,
    authorize("DRIVER"),
    createProofOfDelivery,
    ProofOfDeliveryController.create
);

router.delete(
    "/:id",
    auth,
    authorize("ADMIN"),
    ProofOfDeliveryController.delete
);

module.exports = router;