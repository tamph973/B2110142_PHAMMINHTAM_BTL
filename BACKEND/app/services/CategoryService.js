const ApiError = require("../api-error");
const Category = require("../models/CategoryModel");
const { ObjectId } = require("mongodb");

class CategoryService {
    async createCategory(cateData) {
        if (Object.keys(cateData).length === 0) {
            throw new ApiError(
                400,
                "Data to be updated must not be left empty"
            );
        }
        const existingCate = await Category.findOne({ title: cateData.title });
        if (existingCate) {
            throw new ApiError(400, "Category already exist");
        }
        const newCate = await Category.create(cateData);
        return newCate;
    }
    
    async updateCategory(cateId, cateData) {
        if (!ObjectId.isValid(cateId)) {
            throw new ApiError(400, "Invalid category ID");
        }
        if (Object.keys(cateData).length === 0) {
            throw new ApiError(
                400,
                "Data to be updated must not be left empty"
            );
        }
        const categoty = await Category.findById(cateId);

        if (!categoty) {
            throw new ApiError(404, "Category not found");
        }

        const cartUpdated = await Category.findByIdAndUpdate(cateId, cateData, {
            new: true,
        });
        return cartUpdated;
    }

    async getCategory(cateId) {
        if (!ObjectId.isValid(cateId)) {
            throw new ApiError(400, "Invalid user ID");
        }
        const existingCate = await Category.findById(cateId);
        if (!existingCate) {
            throw new ApiError(404, "Category not found");
        }

        return existingCate;
    }

    async getAllCategory() {
        try {
            const allCart = await Category.find();
            return allCart;
        } catch (err) {
            throw new ApiError(
                500,
                "An error occurred while getting all the cart"
            );
        }
    }
}

module.exports = new CategoryService();
