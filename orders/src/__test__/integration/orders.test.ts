import request from "supertest"
import {app} from "../../app";
import mongoose from "mongoose";
import {TicketService} from "../../services/ticketService";

const ticketService = new TicketService()

it("return an error if an invalid ticketId is provided", async () => {
    await request(app)
        .post("/api/orders")
        .send({
            ticketId: 111
        })
        .expect(400)
    await request(app)
        .post("/api/orders")
        .send({
            ticketId: new mongoose.Types.ObjectId()
        })
        .expect(404)
})


it("return success with valid ticket id", async () => {
    const testTicket = await ticketService
        .setTitle("My test ticket")
        .setPrice(111)
        .createTicket()
    const response = await request(app)
        .post("/api/orders")
        .send({
            ticketId: testTicket.id
        })
        .expect(201)
    expect(response.body.data).toBeDefined()
})

it("return success on orders page", async () => {
    const testTicket = await ticketService
        .setTitle("My test ticket")
        .setPrice(111)
        .createTicket()
    await request(app)
        .post("/api/orders")
        .send({
            ticketId: testTicket.id
        })
        .expect(201)
    const response = await request(app)
        .get("/api/orders")
        .send()
        .expect(200)
    expect(response.body.data.total).toEqual(1)
})

it("return success on order page", async () => {
    const testTicket = await ticketService
        .setTitle("My test ticket")
        .setPrice(111)
        .createTicket()
    const responseOrders = await request(app)
        .post("/api/orders")
        .send({
            ticketId: testTicket.id
        })
        .expect(201)
    expect(responseOrders.body.data).toBeDefined()
    const uriParts = responseOrders.body.data.split("/")
    if (uriParts[3]) {
        const response = await request(app)
            .get(`/api/orders/${uriParts[3]}`)
            .send()
            .expect(200)
        expect(response.body.data._id).toEqual(uriParts[3])
        expect(response.body.data.ticketId).toEqual(testTicket.id)
        expect(response.body.data.status).toEqual("created")
    }
})

it("return success on order delete", async () => {
    const testTicket = await ticketService
        .setTitle("My test ticket")
        .setPrice(111)
        .createTicket()
    const responseOrders = await request(app)
        .post("/api/orders")
        .send({
            ticketId: testTicket.id
        })
        .expect(201)
    expect(responseOrders.body.data).toBeDefined()
    const uriParts = responseOrders.body.data.split("/")
    if (uriParts[3]) {
        await request(app)
            .delete(`/api/orders/${uriParts[3]}`)
            .send()
            .expect(204)
    }
})