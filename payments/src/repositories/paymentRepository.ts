"use strict";

import Payment from "../models/payment";

export class PaymentRepository {

    /**
     * Create a new payment
     * @param orderId
     * @param stripeId
     * @return {object}
     */
    async create(orderId: string, stripeId: string) {
        return await Payment.create({orderId, stripeId})
    }
}