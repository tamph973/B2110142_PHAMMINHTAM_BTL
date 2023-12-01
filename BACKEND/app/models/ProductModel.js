const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
    {
        code: { type: String },
        categories: { type: String },
        date: { type: Date },
        name: { type: String },
        description: { type: String },
        price: { type: Number },
        image: { type: String },
        countInStock: { type: Number },
        brand: { type: String },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Product", ProductSchema);
