"use strict";

import { MongoMemoryServer} from "mongodb-memory-server";
const mongoose = require('mongoose');
import {app} from "../app";

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