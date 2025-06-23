export interface TokenInterface {
    id: string;
    email: string;

    /**
     * Set user id
     * @param {string} id
     * @return {this}
     */
    setId(id: string): setId;

    /**
     * get user id
     * @return {string}
     */
    getId(): any;

    /**
     * Set user email
     * @param {string} email
     * @return {this}
     */
    setEmail(email: string): setEmail;

    /**
     * get user email
     * @return {string}
     */
    getEmail(): any;

    /**
     * generate token
     * @return {string}
     */
    generateToken(): Promise<string>;
}