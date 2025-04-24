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
}