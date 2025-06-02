"use strict";

import jwt from "jsonwebtoken"
import {config} from "dotenv"
config()
export class Token {
    #id: string = ""
    #email: string = ""

    /**
     * Set id
     * @param {string} id
     * @return {this}
     */
    setId(id: string) {
        this.#id = id
        return this
    }
    /**
     * get id
     * @return {string}
     */
    getId() {
        return this.#id
    }
    /**
     * Set email
     * @param {string} email
     * @return {this}
     */
    setEmail(email: string) {
        this.#email = email
        return this
    }
    /**
     * get email
     * @return {string}
     */
    getEmail() {
        return this.#email
    }

    /**
     * generate token
     * @return {string}
     */
    async generateToken() {
        return jwt.sign({
            id: this.getId(),
            email: this.getEmail()
        }, process.env.JWT_SECRET!, {
            expiresIn: 180
        })
    }
}