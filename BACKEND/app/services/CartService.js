const ApiError = require("../api-error");
const Cart = require("../models/CartModel");
const User = require("../models/UserModel");
const Product = require("../models/ProductModel");
const { ObjectId } = require("mongodb");

class CartService {
    async createUserCart(userId) {
        if (!ObjectId.isValid(userId)) {
            throw new ApiError(400, "Invalid user ID");
        }
        const existingUser = await User.findById(userId);
        if (!existingUser) {
            throw new ApiError(404, "User not found");
        }
        const existingCart = await Cart.findOne({ user: userId });
        if (existingCart) {
            throw new ApiError(200, "Cart already exists");
        }
        const newCart = await Cart.create({
            user: userId,
            products: [],
        });
        return newCart;
    }
    async updateCart(cartId, productId, quantity) {
        if (!ObjectId.isValid(cartId)) {
            throw new ApiError(400, "Invalid cart ID");
        }

        const cart = await Cart.findById(cartId);

        if (!cart) {
            throw new ApiError(404, "Cart not found");
        }
        // Check if the product already exists in the cart
        const prodInCart = cart.products.find((prod) =>
            prod.productId.equals(productId)
        );

        if (!prodInCart) {
            throw new ApiError(404, "Product not found in the cart");
        }

        const originalQuantity = prodInCart.quantity;

        if (originalQuantity !== quantity) {
            const productInStock = await Product.findById(productId);
            if (!productInStock || productInStock.countInStock < quantity) {
                throw new ApiError(
                    400,
                    "The product is not in stock or has insufficient quantity"
                );
            }
            productInStock.countInStock -= quantity - originalQuantity;
            prodInCart.quantity = quantity;

            await productInStock.save();
        }

        // Update the quantity
        prodInCart.quantity = quantity;


        // Calculate the totalPrice
        cart.totalPrice = cart.products.reduce(
            (total, prod) => total + prod.price * prod.quantity,
            0
        );

        const cartUpdated = await cart.save();
        return cartUpdated;
    }

    async addInCart(cartId, productId, name, image, price) {
        if (!ObjectId.isValid(cartId) || !ObjectId.isValid(productId)) {
            throw new ApiError(400, "Invalid cart ID or product ID.");
        }
        const cart = await Cart.findById(cartId);
        if (!cart) {
            throw new ApiError(404, "Cart not found");
        }
        // Check if the product already exists in the cart
        const prodInCart = cart.products.find((prod) =>
            prod.productId.equals(productId)
        );

        if (prodInCart && prodInCart.name === name) {
            prodInCart.quantity += 1;
        } else {
            cart.products.push({
                productId,
                name,
                image,
                price,
            });
        }
        const prodInStock = await Product.findById(productId);
        prodInStock.countInStock -= 1;
        await prodInStock.save();
        //Calculate the totalPrice
        cart.totalPrice = cart.products.reduce(
            (total, prod) => total + prod.price * prod.quantity,
            0
        );
        const cartAdd = await cart.save();
        return cartAdd;
    }

    async emptyCart(cartId) {
        if (!ObjectId.isValid(cartId)) {
            throw new ApiError(400, "Invalid cart ID");
        }

        const cart = await Cart.findById(cartId);

        if (!cart) {
            throw new ApiError(404, "Cart not found");
        }

        cart.products = [];
        cart.totalProducts = 0;
        cart.totalPrice = 0;

        const cartEmpty = await cart.save();
        return cartEmpty;
    }

    async deleteCart(cartId) {
        if (!ObjectId.isValid(cartId)) {
            throw new ApiError(400, "Invalid cart ID");
        }
        const existingCart = await Cart.findById(cartId);
        if (!existingCart) {
            throw new ApiError(404, "The cart is not existed");
        }
        const cartDeleted = await Cart.findByIdAndDelete(cartId);
        return cartDeleted;
    }

    async getUserCart(userId) {
        if (!ObjectId.isValid(userId)) {
            throw new ApiError(400, "Invalid user ID");
        }
        const existingUser = await User.findById(userId);
        if (!existingUser) {
            throw new ApiError(404, "User not found");
        }

        const userCart = await Cart.findOne({ user: userId });
        return userCart;
    }

    async getAllCart() {
        try {
            const allCart = await Cart.find();
            return allCart;
        } catch (err) {
            throw new ApiError(
                500,
                "An error occurred while getting all the cart"
            );
        }
    }
}

module.exports = new CartService();
