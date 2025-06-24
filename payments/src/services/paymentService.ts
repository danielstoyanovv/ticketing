"use strict";

import {PaymentServiceinterface} from "./paymentServiceInterface";
import {PaymentRepositoryinterface} from "../repositories/paymentRepositoryInterface";

export class PaymentService implements PaymentServiceinterface {
    orderId: string = ""
    stripeId: string = ""

    interface: PaymentRepositoryinterface;

    constructor(repository: PaymentRepositoryinterface) {
        this.interface = repository;
    }


    /**
     * get orderId
     * @return string
     */
    getOrderId(): string {
        return this.orderId;
    }

    /**
     * set orderId
     * @param orderId
     * @return this
     */
    setOrderId(orderId: string) {
        this.orderId = orderId;
        return this
    }


    /**
     * Set stripeId
     * @param {string} stripeId
     * @return {this}
     */
    setStripeId(stripeId: string) {
        this.stripeId = stripeId
        return this
    }

    /**
     * Get stripeId
     * @return {string}
     */
    getStripeId() {
        return this.stripeId
    }


    /**d
     * Create order
     * @return {object}
     */
    async createPayment() {
        return await this.interface
            .create(this.getOrderId(), this.getStripeId())
    }
}