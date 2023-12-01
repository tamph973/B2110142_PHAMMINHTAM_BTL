const express = require("express");
const router = express.Router();
const cartController = require("../controllers/CartController");
const { authMiddleware, verifyToken } = require("../middleware/authMiddleware");

router.post("/:userId", authMiddleware, cartController.createCart);

router.put("/:cartId", verifyToken, cartController.updateCart);

router.post("/add/:cartId", verifyToken, cartController.addInCart);

router.delete("/empty/:cartId", verifyToken, cartController.emptyCart);

router.delete("/:cartId", authMiddleware, cartController.deleteCart);

router.get("/:userId", authMiddleware, cartController.getUserCart);

router.get("/", authMiddleware, cartController.getAllCart);

module.exports = router;
