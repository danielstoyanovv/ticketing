"use strict";

import User from "../models/user";

export class UserRepository {
    /**
     * Create new user
     * @param email
     * @param password
     * @return {object}
     */
    async createUser(email: string, password: string) {
        return await User.create({email, password})
    }

    /**
     * Find user
     * @param value
     * @return {object}
     */
    async findByField(value: string) {
        const email = value
        return await User.findOne({ email });
    }
}