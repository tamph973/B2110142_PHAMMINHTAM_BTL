const ApiError = require("../api-error");
const UserService = require("../services/UserService");
const JWTService = require("../services/JWTService");
const User = require("../models/UserModel");
const { userTestData } = require("../utils/user_test");
// Register and save new users
exports.register = async (req, res, next) => {
    try {
        const userData = req.body;
        const user = await UserService.register(userData);
        return res.status(201).json({ user });
    } catch (err) {
        console.log(err);
        return next(
            new ApiError(500, "An error occurred while creating the user")
        );
    }
};
// User login
exports.login = async (req, res, next) => {
    try {
        const userData = req.body;
        const user = await UserService.login(userData);
        const { refresh_token, ...newRespone } = user;
        res.cookie("refresh_token", refresh_token, {
            httpOnly: true,
            secure: true,
        });
        return res.status(200).json({ newRespone });
    } catch (err) {
        console.log(err);
        return next(
            new ApiError(500, "An error occurred while login the user")
        );
    }
};
// Update users
exports.update = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const userData = req.body;
        const user = await UserService.update(userId, userData);
        return res.status(200).json({ user });
    } catch (err) {
        return next(
            new ApiError(500, "An error occurred while updating the user")
        );
    }
};
// Delete user
exports.delete = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const user = await UserService.delete(userId);
        return res
            .status(200)
            .json({ message: "User deleted successfully", user });
    } catch (err) {
        return next(
            new ApiError(500, "An error occurred while deleting the user")
        );
    }
};
// Get all users
exports.getAllUser = async (req, res, next) => {
    try {
        const users = await UserService.getAllUser();
        return res.status(200).json({ users });
    } catch (err) {
        return next(
            new ApiError(500, "An error occurred while getting all the user")
        );
    }
};
// Get user by id
exports.getUser = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const user = await UserService.getUser(userId);
        return res.status(200).json({ user });
    } catch (err) {
        return next(
            new ApiError(500, "An error occurred while getting the user by id")
        );
    }
};
// Refresh token by create new accessToken
exports.refreshToken = async (req, res, next) => {
    try {
        const refreshToken = req.cookies.refresh_token;
        const newToken = await JWTService.refreshTokenService(refreshToken);
        return res.status(200).json(newToken);
    } catch (err) {
        return next(
            new ApiError(500, "An error occurred while refreshing token")
        );
    }
};

exports.createUserTest = async (req, res, next) => {
    const usersTest = await User.create(userTestData);
    return res.status(200).json({ usersTest });
};
