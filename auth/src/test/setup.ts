"use strict";

import { MongoMemoryServer} from "mongodb-memory-server";
const mongoose = require('mongoose');
import {app} from "../app";
import request from "supertest";

declare global {
    var signin: () => Promise<string[]>;
    var signup: () => Promise<string>;
}
let mongo:any

beforeAll(async () => {
    mongo = await MongoMemoryServer.create();
    const mongoUri = await mongo.getUri();

    await mongoose.connect(mongoUri)
})

beforeEach(async () => {
    const collections = await mongoose.connection.db.collections()
    for (let collection of collections) {
        await collection.deleteMany({})
    }
})

afterAll(async () => {
    await mongo.stop()
    await mongoose.connection.closed
})

global.signup = async () => {
    const email = "test@test.com";
    const password = "password";

    await request(app)
        .post("/api/users/signup")
        .send({
            email,
            password,
        })
        .expect(201);
    return "Success"
};


global.signin = async () => {
    const email = "test@test.com";
    const password = "password";

    await request(app)
        .post("/api/users/signup")
        .send({
            email,
            password,
        })
        .expect(201);

    const response = await request(app)
        .post("/api/users/signin")
        .send({
            email,
            password,
        })
        .expect(200);

    const cookie = response.get("Set-Cookie");

    if (!cookie) {
        throw new Error("Failed to get cookie from response");
    }
    return cookie;
};