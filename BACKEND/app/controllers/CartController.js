const ApiError = require("../api-error");
const CartService = require("../services/CartService");

// Create new cart
exports.createCart = async (req, res, next) => {
    try {
        const { userId} = req.params;
        const newCart = await CartService.createUserCart(userId);
        return res.status(201).json({ newCart });
    } catch (err) {
        return next(
            new ApiError(500, "An error occurred while creating the cart")
        );
    }
};

exports.updateCart = async (req, res, next) => {
    try {
        const { cartId } = req.params;
        const { productId, quantity } = req.body;
        const cartUpdated = await CartService.updateCart(cartId, productId, quantity);
        return res.status(200).json({ cartUpdated });
    } catch (err) {
        return next(
            new ApiError(500, "An error occurred while updating the cart")
        );
    }
};

exports.addInCart = async (req, res, next) => {
    try {
        const { cartId } = req.params;
        const { productId, name, image, price} = req.body;
        const cartAdd = await CartService.addInCart(
            cartId,
            productId,
            name,
            image,
            price,
        );
        return res.status(200).json({ cartAdd });
    } catch (err) {
        console.log(err);
        return next(
            new ApiError(500, "An error occurred while adding product the cart")
        );
    }
};

exports.emptyCart = async (req, res, next) => {
    try {
        const { cartId } = req.params;
        const cartEmpty = await CartService.emptyCart(cartId);
        return res.status(200).json({ cartEmpty });
    } catch (err) {
        return next(
            new ApiError(500, "An error occurred while deleting the cart")
        );
    }
};

exports.deleteCart = async (req, res, next) => {
    try {
        const { cartId } = req.params;
        const cartDeleted = await CartService.deleteCart(cartId);
        return res.status(200).json({ cartDeleted });
    } catch (err) {
        return next(
            new ApiError(500, "An error occurred while deleting the cart")
        );
    }
};
exports.getUserCart = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const userCart = await CartService.getUserCart(userId);
        return res.status(200).json({ userCart });
    } catch (err) {
        return next(
            new ApiError(500, "An error occurred while getting the user cart ")
        );
    }
};

exports.getAllCart = async (req, res, next) => {
    try {
        const allCart = await CartService.getAllCart();
        return res.status(200).json({ allCart });
    } catch (err) {
        return next(
            new ApiError(500, "An error occurred while getting all the cart")
        );
    }
};
