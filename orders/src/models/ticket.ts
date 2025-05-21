"use strict";

import Order from "./order";

const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        maxlength: 50,
        index: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0, // Prevents negative prices
    },

}, {
    timestamps: true
});

ticketSchema.methods.isReserved = async function () {
    const existingOrder = await Order.findOne({
        ticket: this,
        status: {
            $in: [
                "created",
                "awaiting:payment",
                "complete"
            ]
        }
    })
    return !!existingOrder
}
export default mongoose.model('Ticket', ticketSchema)