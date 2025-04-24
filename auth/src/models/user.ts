"use strict";

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        maxlength: 50,
        index: true,
    },
    password: {
        type: String,
        required: true,
        maxlength: 256,
    },

}, {
    timestamps: true
});

export default mongoose.model('User', userSchema)