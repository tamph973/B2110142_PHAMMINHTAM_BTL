const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
    {
        orderBy: {
            type: mongoose.Types.ObjectId,
            ref: "User",
            required: true,
        },

        orderItems: [
            {
                productId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                    required: true,
                },
                name: {
                    type: String,
                    required: true,
                },
                image: {
                    type: String,
                    required: true,
                },
                price: {
                    type: Number,
                    required: true,
                },
                quantity: {
                    type: Number,
                    default: 1,
                },
            },
        ],
        totalAmount: {
            type: Number,
            default: 0,
        },

        status: {
            type: String,
            default: "Đang xử lý",
            enum: ["Đang xử lý", "Đang giao", "Thành công", "Đã hủy"],
        },

        paymentMethod: {
            type: String,
            default: "COD",
            enum: ["COD", "BANKING", "MOMO"],
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Order", OrderSchema);
