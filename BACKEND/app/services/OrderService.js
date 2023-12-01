const ApiError = require("../api-error");
const Order = require("../models/OrderModel");
const User = require("../models/UserModel");
const Product = require("../models/ProductModel");
const Cart = require("../models/CartModel");
const { ObjectId } = require("mongodb");

class OrderService {
    async createOrder(userId) {
        if (!ObjectId.isValid(userId)) {
            throw new ApiError(400, "Invalid user ID");
        }

        const existingUser = await User.findById(userId);

        if (!existingUser) {
            throw new ApiError(404, "User not found");
        }

        const userCart = await Cart.findOne({ user: userId });

        if (!userCart) {
            throw new ApiError(404, "Cart not found for the user");
        }

        if (userCart.products.length === 0) {
            throw new ApiError(
                400,
                "The cart is empty. Cannot create an order."
            );
        }
        const orderItems = userCart.products.map((prod) => {
            return {
                productId: prod.productId,
                name: prod.name,
                image: prod.image,
                price: prod.price,
                quantity: prod.quantity,
            };
        });

        for (const orderItem of orderItems) {
            const product = await Product.findById(orderItem.productId);
            if (product) {
                product.sold += orderItem.quantity;
                await product.save();
            }
        }

        const finalTotal = orderItems.reduce(
            (total, orderItem) => total + orderItem.price * orderItem.quantity,
            0
        );

        userCart.products = [];
        userCart.totalPrice = 0;

        await userCart.save();

        const newOrder = await Order.create({
            orderBy: userId,
            orderItems,
            totalAmount: finalTotal,
        });

        return newOrder;
    }

    async updateStatus(orderId, status) {
        if (!ObjectId.isValid(orderId)) {
            throw new ApiError(400, "Invalid order ID");
        }

        if (!status) {
            throw new ApiError(400, "Status not exist");
        }
        const newStatus = await Order.findByIdAndUpdate(
            orderId,
            { status: status },
            { new: true }
        );

        return newStatus;
    }

    async getUserOrder(userId) {
        if (!ObjectId.isValid(userId)) {
            throw new ApiError(400, "Invalid user ID");
        }
        const existingUser = await User.findById(userId);
        if (!existingUser) {
            throw new ApiError(404, "User not found");
        }

        const userOrder = await Order.findOne({ orderBy: userId });
        return userOrder;
    }
    async deleteOrder(orderId) {
        if (!ObjectId.isValid(usorderIderId)) {
            throw new ApiError(400, "Invalid order ID");
        }
        const deletedOrder = await User.findByIdAndDelete(orderId);
        return deletedOrder;
    }
}

module.exports = new OrderService();
