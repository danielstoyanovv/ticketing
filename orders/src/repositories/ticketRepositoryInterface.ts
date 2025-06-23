export interface TicketRepositoryInterface {
    /**
     * create a new ticket
     * @param id
     * @param title
     * @param price
     * @return {object}
     */
    create(id: string, title: string, price: number): Promise<Document<unknown, ObtainSchemaGeneric<module;

    /**
     * Find ticket
     * @param id
     * @return {object}
     */
    findById(id: string): Promise<Document<unknown, ObtainSchemaGeneric<module;

    /**
     *
     * @param limit
     * @return {object}
     */
    findAll(limit: object): Promise<Query<Default__v<Require_id<FlattenMaps<BufferToBinary<IfEquals<{}, {}, InferSchemaType<module;

    /**
     * Delete ticket
     * @param id
     * @return {void}
     */
    delete(id: string): Promise<void>;

    /**
     * update ticket
     * @param id
     * @param title
     * @param price
     * @return {object}
     */
    update(id: string, title: string, price: number): Promise<Document<unknown, ObtainSchemaGeneric<module;
}