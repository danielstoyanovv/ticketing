"use strict";

import {PaymentRepository} from "../repositories/paymentRepository";

const repository = new PaymentRepository()

export class PaymentService {
    #orderId: string = ""
    #stripeId: string = ""


    /**
     * get orderId
     * @return string
     */
    getOrderId(): string {
        return this.#orderId;
    }

    /**
     * set orderId
     * @param orderId
     * @return this
     */
    setOrderId(orderId: string) {
        this.#orderId = orderId;
        return this
    }



    /**
     * Set stripeId
     * @param {string} stripeId
     * @return {this}
     */
    setStripeId(stripeId: string) {
        this.#stripeId = stripeId
        return this
    }

    /**
     * Get stripeId
     * @return {string}
     */
    getStripeId() {
        return this.#stripeId
    }


    /**d
     * Create order
     * @return {object}
     */
    async createPayment() {
        return await repository
            .create(this.getOrderId(), this.getStripeId())
    }
}