"use strict";

const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    status: {
        type: String,
        enum: ["created", "cancelled", "awaiting:payment", "complete"],
        default: "created"
    },
    price: {
        type: Number,
        required: true,
        min: 0, // Prevents negative prices
    },
}, {
    timestamps: true
});

orderSchema.set("versionKey", "version")
export default mongoose.model('Order', orderSchema)