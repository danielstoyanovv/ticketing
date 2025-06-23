export interface OrderServiceInterface {
    status: string;
    expiredAt: Date;
    id: string;
    limit: object;
    ticketId: string;

    /**
     * get status
     * @return string
     */
    getStatus(): string;

    /**
     * set status
     * @param status
     * @return this
     */
    setStatus(status: string): setStatus;

    /**
     * get ticket Id
     * @return string
     */
    getTicketId(): string;

    /**
     * set ticket Id
     * @param ticketId
     */
    setTicketId(ticketId: string): setTicketId;

    /**
     * get Expired At
     * @return Date
     */
    getExpiredAt(): Date;

    /**
     * set Expired At
     * @param expiredAt
     * return this
     */
    setExpiredAt(expiredAt: Date): setExpiredAt;

    /**
     * Set is
     * @param {string} id
     * @return {this}
     */
    setId(id: string): setId;

    /**
     * Get id
     * @return {string}
     */
    getId(): any;

    /**
     * Set limit
     * @param {object} limit
     * @return {this}
     */
    setLimit(limit: object): setLimit;

    /**
     * Get limit
     * @return {object}
     */
    getLimit(): any;

    /**
     * Create order
     * @return {object}
     */
    createOrder(): Promise<Document<unknown, ObtainSchemaGeneric<module;

    /**
     * Get order
     * @return {object}
     */
    getOrder(): Promise<Document<unknown, ObtainSchemaGeneric<module;

    /**
     * Get orders
     * @return {object}
     */
    getOrders(): Promise<Query<Default__v<Require_id<FlattenMaps<BufferToBinary<IfEquals<{}, {}, InferSchemaType<module;

    /**
     * Delete order
     * @return {void}
     */
    deleteOrder(): Promise<void>;

    /**
     * Update order
     * @return {object}
     */
    updateOrder(): Promise<Document<unknown, ObtainSchemaGeneric<module;
}