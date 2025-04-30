"use strict";

import {UserRepository} from "../repositories/UserRepository";

const repository = new UserRepository()

export class UserService {
    #email: string = ""
    #password: string = ""

    /**
     * get password
     * @return {string}
     */
    getPassword(): string {
        return this.#password;
    }

    /**
     * Set user password
     * @param {string} value
     * @return {this}
     */
    setPassword(value: string) {
        this.#password = value;
        return this
    }

    /**
     * get user email
     * @return {string}
     */
    getEmail(): string {
        return this.#email;
    }

    /**
     * set user email
     * @param value
     * @return {this}
     */
    setEmail(value: string) {
        this.#email = value;
        return this
    }

    /**
     * Create user
     * @return {object}
     */
    async createUser() {
        return await repository.createUser(
            this.getEmail(),
            this.getPassword()
        )
    }

    /**
     * Check if user with specified email exists
     * @return {object}
     */
    async userExists() {
        return await repository
            .findByField(this.getEmail())

    }
}