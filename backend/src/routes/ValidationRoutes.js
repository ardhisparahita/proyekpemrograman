const express = require("express");
const router = express.Router();

const ValidationController = require("../controllers/ValidationController");

const auth = require("../middleware/auth");
const authorize = require("../middleware/authorize");

const {
    createValidation,
} = require("../validations/validationValidations");

router.get(
    "/",
    auth,
    authorize("OWNER", "SUPERVISOR", "ADMIN"),
    ValidationController.findAll
);

router.get(
    "/:id",
    auth,
    authorize("OWNER", "SUPERVISOR", "ADMIN"),
    ValidationController.findById
);

router.post(
    "/",
    auth,
    authorize("STAFF_GUDANG"),
    createValidation,
    ValidationController.create
);

router.delete(
    "/:id",
    auth,
    authorize("ADMIN"),
    ValidationController.delete
);

module.exports = router;