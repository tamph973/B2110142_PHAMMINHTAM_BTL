const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/CategoryController");
const { authMiddleware, verifyToken } = require("../middleware/authMiddleware");

router.post("/", authMiddleware, categoryController.createCategory)

router.put("/:cateId", authMiddleware, categoryController.updateCategory)

router.get("/:cateId", verifyToken, categoryController.getCategory)

router.get("/",verifyToken, categoryController.getAllCategory)

module.exports = router;
