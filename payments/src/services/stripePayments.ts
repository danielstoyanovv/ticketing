"use strict";

require('dotenv').config()
const Stripe = require('stripe');

export class StripePayments {
    constructor(client: Object) {
        this.client = Stripe(process.env.STRIPE_SECRET_KEY, {
            apiVersion: "2020-03-02"
        })
    }

    /**
     * process Transaction
     * @param order
     * @return {string}
     */
    async processTransaction(order: Object) {
        const payment = await this.client.paymentIntents.create({
            amount: order.price * 100,
            currency: 'usd',
            automatic_payment_methods: {
                enabled: true,
            },
        });
        // const charge = await this.client.charges.create({
        //     amount: order.price * 100,
        //     currency: 'usd',
        //     source: "tok_visa",
        // });

        return payment.client_secret
    }

    /**
     * approve Transaction
     * @param secret
     * @return {void}
     */
    async approveTransaction(secret: string) {
        const elements = await this.client.elements();
        const cardElement = elements.create('card');
        cardElement.mount('#card-element');
        const { error, paymentIntent }  = await this.client.confirmCardPayment(secret, {
            payment_method: {
                card: cardElement, // Collected from Stripe Elements
                billing_details: { name: 'Customer Name' },
            },
        });
        console.log(error)
    }
}