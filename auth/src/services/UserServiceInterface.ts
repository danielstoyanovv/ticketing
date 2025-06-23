export interface UserServiceInterface {
    email: string;
    password: string;

    /**
     * get password
     * @return {string}
     */
    getPassword(): string;

    /**
     * Set user password
     * @param {string} value
     * @return {this}
     */
    setPassword(value: string): setPassword;

    /**
     * get user email
     * @return {string}
     */
    getEmail(): string;

    /**
     * set user email
     * @param value
     * @return {this}
     */
    setEmail(value: string): setEmail;

    /**
     * Create user
     * @return {object}
     */
    createUser(): Promise<any>;

    /**
     * Get user
     * @return {object}
     */
    userExists(): Promise<any>;
}