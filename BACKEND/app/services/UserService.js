const ApiError = require("../api-error");
const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const JWTService = require("../services/JWTService");
const { ObjectId } = require("mongodb");

class UserService {
    async validateInput(data) {
        if (Object.keys(data).length === 0) {
            throw new ApiError(
                400,
                "Data to be updated must not be left empty"
            );
        }

        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!emailRegex.test(data.email)) {
            throw new ApiError(400, "Invalid email format");
        }
    }

    async register(userData) {
        await this.validateInput(userData);

        const existingUser = await User.findOne({ email: userData.email });
        if (existingUser) {
            throw new ApiError(200, "Email already exists");
        }

        const user = await User.create(userData);
        return user;
    }

    async login(userData) {
        await this.validateInput(userData);
        const existingUser = await User.findOne({ email: userData.email });
        if (!existingUser) {
            throw new ApiError(404, "The user does not exist");
        }

        const comparePassword = bcrypt.compareSync(
            userData.password,
            existingUser.password
        );
        if (!comparePassword) {
            throw new ApiError(
                400,
                "The password does not match the confirmation"
            );
        }

        const access_token = await JWTService.generalAccessToken({
            id: existingUser._id,
            isAdmin: existingUser.isAdmin,
        });
        const refresh_token = await JWTService.generalRefreshToken({
            id: existingUser._id,
            isAdmin: existingUser.isAdmin,
        });
        
        return { access_token, refresh_token };
    }

    async update(userId, userData) {
        if (!ObjectId.isValid(userId)) {
            throw new ApiError(400, "Invalid user ID");
        }
        if (Object.keys(userData).length === 0) {
            return next(
                new ApiError(400, "Data to be updated must not be left empty")
            );
        }
        const existingUser = await User.findById(userId);
        if (!existingUser) {
            throw new ApiError(404, "The user does not exist");
        }

        const updateUser = await User.findByIdAndUpdate(userId, userData, {
            new: true,
        });
        return updateUser;
    }

    async delete(id) {
        if (!ObjectId.isValid(id)) {
            throw new ApiError(400, "Invalid user ID");
        }

        const existingUser = await User.findById(id);
        if (!existingUser) {
            throw new ApiError(404, "The user does not exist");
        }

        const user = await User.findByIdAndDelete(id);
        return user;
    }

    async getAllUser() {
        const users = await User.find();
        return users;
    }

    async getUser(id) {
        if (!ObjectId.isValid(id)) {
            throw new ApiError(400, "Invalid user ID");
        }

        const existingUser = await User.findById(id);
        if (!existingUser) {
            throw new ApiError(404, "The user does not exist");
        }

        return existingUser;
    }
}

module.exports = new UserService();
