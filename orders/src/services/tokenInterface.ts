export interface TokenInterface {
    id: string;
    email: string;

    /**
     * Set id
     * @param {string} id
     * @return {this}
     */
    setId(id: string): setId;

    /**
     * get id
     * @return {string}
     */
    getId(): any;

    /**
     * Set email
     * @param {string} email
     * @return {this}
     */
    setEmail(email: string): setEmail;

    /**
     * get email
     * @return {string}
     */
    getEmail(): any;

    /**
     * generate token
     * @return {string}
     */
    generateToken(): Promise<string>;
}