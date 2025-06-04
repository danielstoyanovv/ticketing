"use strict";

const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
    orderId: {
        required: true,
        type: String,
        min: 1,
        max: 10
    },
    stripeId: {
        required: true,
        type: String,
        min: 1,
        max: 10
    }
}, {
    timestamps: true
});

export default mongoose.model('Payment', paymentSchema)