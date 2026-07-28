const express = require("express");
const router = express.Router();

const ProductController = require('../controllers/ProductController');
const validateProduct = require('../validations/productValidation');

const auth = require('../middleware/auth');
const authorize = require('../middleware/authorize');

router.get(
    "/",
    auth,
    ProductController.findAll
);

router.get(
    "/:id",
    auth,
    ProductController.findById
);

router.post(
    "/",
    auth,
    authorize("ADMIN"),
    validateProduct,
    ProductController.create
);

router.put(
    "/:id",
    auth,
    authorize("ADMIN"),
    validateProduct,
    ProductController.update
);

router.delete(
    "/:id",
    auth,
    authorize("ADMIN"),
    ProductController.delete
);

module.exports = router;