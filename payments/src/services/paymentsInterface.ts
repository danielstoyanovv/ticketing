export interface PaymentsInterface {
    /**
     * process Transaction
     * @param order
     * @return {object}
     */
    processTransaction(order: Object): Promise<Stripe.PaymentIntent & {
        lastResponse: {
            headers: { [p: string]: string };
            requestId: string;
            statusCode: number;
            apiVersion?: string;
            idempotencyKey?: string;
            stripeAccount?: string
        }
    }>;

    /**
     * approve Transaction
     * @param secret
     * @return {void}
     */
    approveTransaction(secret: string): Promise<void>;
}