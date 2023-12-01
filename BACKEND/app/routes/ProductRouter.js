const express = require("express");
const router = express.Router();
const { authMiddleware, verifyToken } = require("../middleware/authMiddleware");
const productController = require("../controllers/ProductController");

router.post("/", productController.createProduct);

router.put("/:prodId", productController.updateProduct);

router.delete("/:prodId", productController.deleteProduct);

router.delete("/", productController.deleteAllProd);

router.get("/", productController.getAllProduct);

router.get("/:prodId", productController.getProduct);

router.get("/byname", productController.findByName);
module.exports = router;
