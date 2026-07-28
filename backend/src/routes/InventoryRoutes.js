const express = require("express");
const router = express.Router();

const InventoryController = require('../controllers/InventoryController');
const validateInventory = require('../validations/inventoryValidation');

const auth = require('../middleware/auth');
const authorize = require('../middleware/authorize');

router.get(
    "/",
    auth,
    InventoryController.findAll
);

router.get(
    "/:id",
    auth,
    InventoryController.findById
);


router.post(
    "/",
    auth,
    authorize("ADMIN"),
    validateInventory,
    InventoryController.create
);

router.put(
    "/:id",
    auth,
    authorize("ADMIN"),
    validateInventory,
    InventoryController.update
);

router.delete(
    "/:id",
    auth,
    authorize("ADMIN"),
    InventoryController.delete
);

module.exports = router;