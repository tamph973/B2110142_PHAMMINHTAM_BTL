const ApiError = require("../api-error");
const Product = require("../models/ProductModel");
const { ObjectId } = require("mongodb");

class ProductService {
    // async validateProductInput(data) {
    //     const {
    //         name,
    //         price,
    //         description,
    //         image,
    //         brand,
            
    //     } = data;
    //      console.log(data);
    //     if (!name || !price || !image || !description || !brand) {
    //         throw new ApiError(400, "The input cannot be empty");
    //     }
    // }

    async create(newProduct) {
        try {
            // await this.validateProductInput(newProduct);
            const existingProduct = await Product.findOne({ name: newProduct.name });
            if (existingProduct) {
                throw new ApiError(200, "Product already exists");
            }

            const product = await Product.create(newProduct);
            
            return product;
        } catch (err) {
            throw (err);
        }
    }

    async update(id, data) {
        try {
            if (!ObjectId.isValid(id)) {
                throw new ApiError(400, "Invalid product ID");
            }
            const existingProduct = await Product.findById(id);
            if (!existingProduct) {
                throw new ApiError(404, "The product does not exist");
            }

            const updateProduct = await Product.findByIdAndUpdate(id, data, { new: true });
            return updateProduct;
        } catch (error) {
            throw error;
        }
    }

    async delete(id) {
        try {
            if (!ObjectId.isValid(id)) {
                throw new ApiError(400, "Invalid product ID");
            }
            const existingProduct = await Product.findById(id);
            if (!existingProduct) {
                throw new ApiError(404, "The product does not exist");
            }

            const product = await Product.findByIdAndDelete(id);
            return product;
        } catch (error) {
            throw error;
        }
    }

    async deleteAll() {
        try {
            const existingProducts = await Product.find();
            if (existingProducts.length === 0) {
                throw new ApiError(404, "There are no products to delete");
            }
            const result = await Product.deleteMany();
            return result.deletedCount;
        } catch (error) {
            throw error;
        }
    }

    async getAllProduct() {
        try {
            const products = await Product.find();
            return products;
        } catch (error) {
            throw error;
        }
    }

    async getProduct(id) {
        try {
            if (!ObjectId.isValid(id)) {
                throw new ApiError(400, "Invalid product ID");
            }
            const existingProduct = await Product.findById(id);
            if (!existingProduct) {
                throw new ApiError(404, "The product does not exist");
            }

            return existingProduct;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new ProductService();
