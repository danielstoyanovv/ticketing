export interface TicketServiceInterface {
    title: string;
    price: number;
    id: string;
    limit: object;

    /**
     * get Title
     * @return string
     */
    getTitle(): string;

    /**
     * set title
     * @param value
     * @return this
     */
    setTitle(value: string): setTitle;

    /**
     * getPrice
     * @return number
     */
    getPrice(): number;

    /**
     * set Price
     * @param value
     * @return this
     */
    setPrice(value: number): setPrice;

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
     * Create ticket
     * @return {object}
     */
    createTicket(): Promise<Document<unknown, ObtainSchemaGeneric<module;

    /**
     * Get ticket
     * @return {object}
     */
    getTicket(): Promise<Document<unknown, ObtainSchemaGeneric<module;

    /**
     * Get users
     * @return {object}
     */
    getTickets(): Promise<Query<Default__v<Require_id<FlattenMaps<BufferToBinary<IfEquals<{}, {}, InferSchemaType<module;

    /**
     * Delete ticket
     * @return {void}
     */
    deleteTicket(): Promise<void>;

    /**
     * Update ticket
     * @return {object}
     */
    updateTicket(): Promise<Document<unknown, ObtainSchemaGeneric<module;
}