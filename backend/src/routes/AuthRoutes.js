const router = require("express").Router();

const authController = require("../controllers/AuthController");

router.post("/register", authController.register);

router.post("/login", authController.login);

router.get("/drivers", authController.getDrivers);

module.exports = router;