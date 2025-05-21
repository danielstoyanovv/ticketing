"use strict";

const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    status: {
        type: String,
        enum: ["created", "cancelled", "awaiting:payment", "complete"],
        default: "created"
    },
    expiredAt: {
        type: Date,
        index: { expires: 0 }  // TTL index: document expires exactly at expiredAt
    },
    ticketId: {
        type: String,
        max: 100,
        required: true,
    },
}, {
    timestamps: true
});

export default mongoose.model('Order', orderSchema)