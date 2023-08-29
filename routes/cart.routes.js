const express = require("express");
const cartController = require("../controller/cart.controller");

const router = express.Router();

router.get("/", cartController.getCart);

router.post("/items", cartController.addCartItem);

router.patch("/items", cartController.updateCartItem); //patch is used when we update parts of existing data

module.exports = router;
