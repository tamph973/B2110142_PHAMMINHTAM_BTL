const ApiError = require("../api-error");
const OrderService = require("../services/OrderService");

// Create new order
exports.createOrder = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const newOrder = await OrderService.createOrder(userId);
        return res.status(201).json({newOrder});
    } catch (err) {
        return next(
            new ApiError(500, "An error occurred while creating the order")
        );
    }
};

exports.updateStatus = async (req, res, next) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;
        const newStatus = await OrderService.updateStatus(
            orderId, status
        );
        return res.status(200).json({ newStatus });
    } catch (err) {
        return next(
            new ApiError(500, "An error occurred while updating status for the order")
        );
    }
};

exports.getUserOrder = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const userOrder = await OrderService.getUserOrder(userId);
        return res.status(200).json({ userOrder });
    } catch (err) {
        return next(
            new ApiError(500, "An error occurred while getting the user order ")
        );
    }
};
exports.deleteOrder = async (req, res, next) => {
    try {
        const { orderId } = req.params;
        const deletedOrder = await OrderService.deleteOrder(orderId);
        return res.status(200).json({ deletedOrder });
    } catch (err) {
        return next(
            new ApiError(500, "An error occurred while deleting the order ")
        );
    }
};

