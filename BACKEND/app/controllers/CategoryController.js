const ApiError = require("../api-error");
const CategoryService = require("../services/CategoryService");

exports.createCategory = async (req, res, next) => {
    try {
        const cateData = req.body;
        const newCate = await CategoryService.createCategory(cateData);
        return res.status(201).json({ newCate });
    } catch (err) {
        return next(
            new ApiError(500, "An error occurred while creating the category")
        );
    }
};

exports.updateCategory = async (req, res, next) => {
    try {
        const { cateId } = req.params;
        const cateData = req.body;
        const updatedCate = await CategoryService.updateCategory(
            cateId,
            cateData
        );
        return res.status(201).json({ updatedCate });
    } catch (err) {
        console.log(err);
        return next(
            new ApiError(500, "An error occurred while updating the category")
        );
    }
};

exports.getCategory = async (req, res, next) => {
    try {
        const { cateId } = req.params;
        const categories = await CategoryService.getCategory(cateId);
        return res.status(201).json({ categories });
    } catch (err) {
        return next(
            new ApiError(500, "An error occurred while getting the category")
        );
    }
};
exports.getAllCategory = async (req, res, next) => {
    try {
        const categories = await CategoryService.getAllCategory();
        return res.status(201).json({ categories });
    } catch (err) {
        return next(
            new ApiError(500, "An error occurred while getting  all the category")
        );
    }
};
