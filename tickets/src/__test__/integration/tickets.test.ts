import request from "supertest"
import {app} from "../../app";
import mongoose from "mongoose";

it("return an error if an invalid title is provided", async () => {
    const response = await request(app)
        .post("/api/tickets")
        .send({
            price: 111
        })
        .expect(400)
})
it("return an error if an invalid price is provided", async () => {
    const response = await request(app)
        .post("/api/tickets")
        .send({
            title: "Test ticket"
        })
        .expect(400)
})

it("return an error if an negative price is provided", async () => {
    const response = await request(app)
        .post("/api/tickets")
        .send({
            price: -11
        })
        .expect(400)
})

it("return success with valid inputs ", async () => {
    const response = await request(app)
        .post("/api/tickets")
        .send({
            price: 111,
            title: "Test ticket"
        })
        .expect(201)
})

it("return an error because update is protected route and authentication is not provided", async () => {
    const id = new mongoose.Types.ObjectId().toHexString()
    await request(app)
        .patch(`/api/tickets/${id}`)
        .send({
            title: "Test ticket",
            price: 102
        })
        .expect(401)
})

it("return an error because delete is protected route and authentication is not provided", async () => {
    const id = new mongoose.Types.ObjectId().toHexString()
    await request(app)
        .patch(`/api/tickets/${id}`)
        .send({
            title: "Test ticket",
            price: 102
        })
        .expect(401)
})

it("return success on tickets page", async () => {
    await request(app)
        .post("/api/tickets")
        .send({
            price: 111,
            title: "Test ticket"
        })
        .expect(201)
    const response = await request(app)
        .get("/api/tickets")
        .send()
        .expect(200)
    expect(response.body.data.total).toEqual(1)
})


