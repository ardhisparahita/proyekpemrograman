const express = require("express");
const router = express.Router();

const WarehouseController = require('../controllers/WarehouseController');
const validateWarehouse = require('../validations/warehouseValidation');

const auth = require('../middleware/auth');
const authorize = require('../middleware/authorize');

router.get("/", auth, WarehouseController.findAll);

router.get("/:id", auth, WarehouseController.findById);

router.post(
    "/",
    auth,
    authorize("ADMIN"),
    validateWarehouse,
    WarehouseController.create
);

router.put(
    "/:id",
    auth,
    authorize("ADMIN"),
    validateWarehouse,
    WarehouseController.update
);

router.delete(
    "/:id",
    auth,
    authorize("ADMIN"),
    WarehouseController.delete
);

module.exports = router;