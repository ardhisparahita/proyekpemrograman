const express = require("express");
const router = express.Router();

const AuditLogController = require("../controllers/AuditLogController");

const auth = require("../middleware/auth");
const authorize = require("../middleware/authorize");

const {
    createAuditLog,
} = require("../validations/auditLogValidation");

router.get(
    "/",
    auth,
    authorize("ADMIN", "OWNER"),
    AuditLogController.findAll
);

router.get(
    "/:id",
    auth,
    authorize("ADMIN", "OWNER"),
    AuditLogController.findById
);

router.post(
    "/",
    auth,
    authorize("ADMIN"),
    createAuditLog,
    AuditLogController.create
);

router.delete(
    "/:id",
    auth,
    authorize("ADMIN"),
    AuditLogController.delete
);

module.exports = router;