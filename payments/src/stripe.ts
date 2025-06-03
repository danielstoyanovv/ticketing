"use strict";

require('dotenv').config()
const Stripe = require('stripe');

export const stripe = Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2020-03-02"
})