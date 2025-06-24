export interface OrderRepositoryinterface {
    /**
     * Create a new order
     * @param id
     * @param status
     * @param price
     * @return {object}
     */
    create(id: string, status: string, price: number): Promise<Document<unknown, module;

    /**
     * Find
     * @param id
     * @return {object}
     */
    findById(id: string): Promise<Document<unknown, module;

    /**
     * find all orders
     * @param limit
     * @return {object}
     */
    findAll(limit: object): Promise<Query<Default__v<Require_id<FlattenMaps<BufferToBinary<module;

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
     * @param price
     */
    update(id: string, status: string, price: number): Promise<Document<unknown, module;
}