export interface OrderRepositoryInterface {
    /**
     * create new Order
     * @param status
     * @param expiredAt
     * @param ticketId
     * @return (object)
     */
    create(status: string, expiredAt: Date, ticketId: string): Promise<Document<unknown, ObtainSchemaGeneric<module;

    /**
     * Find
     * @param id
     * @return {object}
     */
    findById(id: string): Promise<Document<unknown, ObtainSchemaGeneric<module;

    /**
     * find all orders
     * @param limit
     * @return {object}
     */
    findAll(limit: object): Promise<Query<Default__v<Require_id<FlattenMaps<BufferToBinary<IfEquals<{}, {}, InferSchemaType<module;

    /**
     * Delete order
     * @param id
     * @return {void}
     */
    delete(id: string): Promise<void>;

    /**
     * Update order
     * @param id
     * @param status
     * @param expiredAt
     * @param ticketId
     * @return {object}
     */
    update(id: string, status: string, expiredAt: Date, ticketId: string): Promise<Document<unknown, ObtainSchemaGeneric<module;
}