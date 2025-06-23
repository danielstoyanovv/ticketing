"use strict";

import {UserServiceInterface} from "./UserServiceInterface";
import {UserRepositoryInterface} from "../repositories/UserRepositoryInterface";

export class UserService implements UserServiceInterface {
    email: string = ""
    password: string = ""
    interface: UserRepositoryInterface;

    constructor(repository: UserRepositoryInterface) {
        this.interface = repository;
    }

    /**
     * get password
     * @return {string}
     */
    getPassword(): string {
        return this.password;
    }

    /**
     * Set user password
     * @param {string} value
     * @return {this}
     */
    setPassword(value: string) {
        this.password = value;
        return this
    }

    /**
     * get user email
     * @return {string}
     */
    getEmail(): string {
        return this.email;
    }

    /**
     * set user email
     * @param value
     * @return {this}
     */
    setEmail(value: string) {
        this.email = value;
        return this
    }

    /**
     * Create user
     * @return {object}
     */
    async createUser() {
        return await this.interface.createUser(
            this.getEmail(),
            this.getPassword()
        )
    }

    /**
     * Get user
     * @return {object}
     */
    async userExists() {
        return await this.interface
            .findByField(this.getEmail())

    }
}