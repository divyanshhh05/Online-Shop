const express = require("express");
const authController = require("../controller/auth.controller"); //(../ means go up one level, i.e. go out of the current folder)

const router = express.Router();

router.get("/signup", authController.getSignUp);
router.post("/signup", authController.signup);
router.get("/login", authController.getLogin);
router.post("/login", authController.login);
router.post("/logout", authController.logout);

module.exports = router;
