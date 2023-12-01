const express = require("express");
const router = express.Router();
const { authMiddleware, verifyToken } = require("../middleware/authMiddleware");
const userController = require("../controllers/UserController");

router.post("/register", userController.register);

router.post("/login", userController.login);

router.put("/:userId", verifyToken, userController.update);

router.delete("/:userId", authMiddleware, userController.delete);

router.get("/", authMiddleware, userController.getAllUser);

router.get("/:userId", verifyToken, userController.getUser);

router.post("/refreshToken", userController.refreshToken);

router.post("/testData", userController.createUserTest);
module.exports = router;
