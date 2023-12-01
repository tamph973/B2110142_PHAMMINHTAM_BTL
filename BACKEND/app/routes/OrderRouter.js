const express = require("express");
const router = express.Router();
const orderController = require("../controllers/OrderController");
const { authMiddleware, verifyToken } = require("../middleware/authMiddleware");

router.post("/:userId", verifyToken, orderController.createOrder);

router.put("/status/:orderId", verifyToken, orderController.updateStatus);

router.get("/:userId", verifyToken, orderController.getUserOrder);

router.delete("/:orderId", authMiddleware, orderController.deleteOrder);

module.exports = router;
