const userRouter = require("../routes/UserRouter");
const productRouter = require("../routes/ProductRouter");
const cartRouter = require("../routes/CartRouter");
const orderRouter = require("../routes/OrderRouter");
const categoryRouter = require("../routes/CategoryRouter");

const routes = (app) => {
    app.use("/api/users", userRouter);
    app.use("/api/products", productRouter);
    app.use("/api/carts", cartRouter);
    app.use("/api/orders", orderRouter);
    app.use("/api/categories", categoryRouter);

};

module.exports = routes;
