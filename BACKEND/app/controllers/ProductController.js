const ApiError = require("../api-error");
const ProductService = require("../services/ProductService");
const Product = require("../models/ProductModel");
// Create and save a new product
exports.createProduct = async (req, res, next) => {
    try {
        const prodData = req.body;
        const product = await ProductService.create(prodData);
        return res.status(201).json(product);
    } catch (err) {
        console.log(err);
        return next(
            new ApiError(500, "An error occurred while creating the product")
        );
    }
};
// Update product
exports.updateProduct = async (req, res, next) => {
    try {
        const { prodId } = req.params;
        const prodData = req.body;

        if (Object.keys(prodData).length === 0) {
            return next(
                new ApiError(400, "Data to be updated must not be left empty")
            );
        }

        const product = await ProductService.update(prodId, prodData);

        return res.status(200).json({ product });
    } catch (err) {
        return next(
            new ApiError(500, "An error occurred while updating the product")
        );
    }
};

// Delete product
exports.deleteProduct = async (req, res, next) => {
    try {
        const { prodId } = req.params;
        await ProductService.delete(prodId);

        return res.status(200).json({
            message: "Product deleted successfully",
        });
    } catch (err) {
        return next(
            new ApiError(500, "An error occurred while deleting the product")
        );
    }
};
// Delete all product
exports.deleteAllProd = async (req, res, next) => {
    try {
        const productCount = await ProductService.deleteAll();

        return res.status(200).json({
            message: `${productCount} product deleted successfully`,
        });
    } catch (err) {
        return next(
            new ApiError(
                500,
                "An error occurred while deleting all the product"
            )
        );
    }
};

// Get all products
exports.getAllProduct = async (req, res, next) => {
    try {
        const products = await ProductService.getAllProduct();

        return res.status(200).json(products);
    } catch (err) {
        return next(
            new ApiError(500, "An error occurred while getting all the user")
        );
    }
};

// Get product via id
exports.getProduct = async (req, res, next) => {
    try {
        const { prodId } = req.params;
        const product = await ProductService.getProduct(prodId);

        return res.status(200).json({ product });
    } catch (err) {
        return next(
            new ApiError(
                500,
                "An error occurred while getting the product via id"
            )
        );
    }
};

exports.findByName = async (req, res, next) => {
    try {
        const name = req.query.name;
        if (!name) {
            return res.status(400).json({ error: "Tên không được để trống" });
        }

        // Tìm sản phẩm dựa trên tên
        const products = await Product.find({
            name: { $regex: new RegExp(name, "i") },
        });

        // Kiểm tra xem có sản phẩm nào được tìm thấy không
        if (products.length === 0) {
            return res
                .status(404)
                .json({ error: "Không tìm thấy sản phẩm nào" });
        }

        // Trả về danh sách sản phẩm dưới dạng JSON
        return  res.json(products);
    } catch (err) {
        console.log(err);
        return next(
            new ApiError(
                500,
                "An error occurred while getting the product via id"
            )
        );
    }
};
