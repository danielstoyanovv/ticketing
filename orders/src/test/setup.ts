"use strict";

import { MongoMemoryServer} from "mongodb-memory-server";
const mongoose = require('mongoose');
import {app} from "../app";
import request from "supertest";
import {Token} from "../services/token";

declare global {
    var signin: () => string[]
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


global.signin = () => {
    const email = "test@test.com";
    const id = new mongoose.Types.ObjectId().toHexString()

    const token = (new Token()
        .setId(id)
        .setEmail(email)
        .generateToken())
    const session = {jwt: token}
    const sessionJson = JSON.stringify(session)
    const base64 = Buffer.from(sessionJson).toString("base64")
    // return [`session=${token}`];
    return [`session=${base64}`];
};