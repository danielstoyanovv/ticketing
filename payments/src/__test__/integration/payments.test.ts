import request from "supertest"
import {app} from "../../app";
import mongoose from "mongoose";

it("return an error if an invalid orderId is provided", async () => {
    await request(app)
        .post("/api/payments")
        .send({
            token: new mongoose.Types.ObjectId()
        })
        .expect(400)
})

it("return an error if an invalid token is provided", async () => {
    await request(app)
        .post("/api/payments")
        .send({
            orderId: new mongoose.Types.ObjectId()
        })
        .expect(400)
})

it("return an error if an non-existent order is provided", async () => {
    await request(app)
        .post("/api/payments")
        .send({
            token: new mongoose.Types.ObjectId(),
            orderId: new mongoose.Types.ObjectId()
        })
        .expect(404)
})

