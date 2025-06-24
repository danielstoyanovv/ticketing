export interface PaymentServiceinterface {
    orderId: string;
    stripeId: string;

    /**
     * get orderId
     * @return string
     */
    getOrderId(): string;

    /**
     * set orderId
     * @param orderId
     * @return this
     */
    setOrderId(orderId: string): setOrderId;

    /**
     * Set stripeId
     * @param {string} stripeId
     * @return {this}
     */
    setStripeId(stripeId: string): setStripeId;

    /**
     * Get stripeId
     * @return {string}
     */
    getStripeId(): any;

    /**d
     * Create order
     * @return {object}
     */
    createPayment(): Promise<Document<unknown, module;
}