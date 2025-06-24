"use strict";

import Payment from "../models/payment";
import {PaymentRepositoryinterface} from "./paymentRepositoryInterface";

export class PaymentRepository implements PaymentRepositoryinterface {

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