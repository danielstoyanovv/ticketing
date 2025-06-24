export interface PaymentRepositoryinterface {
    /**
     * Create a new payment
     * @param orderId
     * @param stripeId
     * @return {object}
     */
    create(orderId: string, stripeId: string): Promise<Document<unknown, module;
}