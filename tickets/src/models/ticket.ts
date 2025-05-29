"use strict";

const mongoose = require("mongoose");
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';

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
    orderId: {
        type: String,
        maxlength: 20,
        default: ""
    }

}, {
    timestamps: true
});

ticketSchema.set("versionKey", "version")
ticketSchema.plugin(updateIfCurrentPlugin);
export default mongoose.model('Ticket', ticketSchema)