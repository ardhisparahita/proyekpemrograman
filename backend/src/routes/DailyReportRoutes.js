const express = require("express");
const router = express.Router();

const DailyReportController = require("../controllers/DailyReportController");

const auth = require("../middleware/auth");
const authorize = require("../middleware/authorize");

const {
    createDailyReport,
    updateDailyReport,
} = require("../validations/dailyReportValidation");

router.get(
    "/",
    auth,
    authorize("ADMIN", "OWNER", "WAREHOUSE"),
    DailyReportController.findAll
);

router.get(
    "/:id",
    auth,
    authorize("ADMIN", "OWNER", "WAREHOUSE"),
    DailyReportController.findById
);

router.post(
    "/",
    auth,
    authorize("WAREHOUSE"),
    createDailyReport,
    DailyReportController.create
);

router.put(
    "/:id",
    auth,
    authorize("ADMIN"),
    updateDailyReport,
    DailyReportController.update
);

router.delete(
    "/:id",
    auth,
    authorize("ADMIN"),
    DailyReportController.delete
);

module.exports = router;