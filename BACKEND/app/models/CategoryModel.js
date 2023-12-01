const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
    {
        title: { type: String, required: true, unique: true },
        brand: { type: Array, required: true },
        image: { type: String, required: true },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Category", CategorySchema);
