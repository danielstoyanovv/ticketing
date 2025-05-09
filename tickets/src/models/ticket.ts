"use strict";

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

export default mongoose.model('Ticket', ticketSchema)