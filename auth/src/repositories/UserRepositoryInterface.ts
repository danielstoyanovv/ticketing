export interface UserRepositoryInterface {
    /**
     * Create new user
     * @param email
     * @param password
     * @return {object}
     */
    createUser(email: string, password: string): Promise<any>;

    /**
     * Find by field
     * @param value
     * @return {object}
     */
    findByField(value: string): Promise<any>;
}