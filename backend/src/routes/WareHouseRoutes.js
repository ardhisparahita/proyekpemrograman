const express = require("express");
const router = express.Router();

const WarehouseController = require("../controllers/WarehouseController");
const validateWarehouse = require("../validations/warehouseValidation");

const verifyToken = require("../middlewares/verifyToken");
const authorize = require("../middlewares/authorize");

router.get(
    "/",
    verifyToken,
    WarehouseController.findAll
);

router.get(
    "/:id",
    verifyToken,
    WarehouseController.findById
);

router.post(
    "/",
    verifyToken,
    authorize("ADMIN"),
    validateWarehouse,
    WarehouseController.create
);

router.put(
    "/:id",
    verifyToken,
    authorize("ADMIN"),
    validateWarehouse,
    WarehouseController.update
);

router.delete(
    "/:id",
    verifyToken,
    authorize("ADMIN"),
    WarehouseController.delete
);

module.exports = router;