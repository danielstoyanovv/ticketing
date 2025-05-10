import request from "supertest"
import {app} from "../../app";
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

it("create a ticket with valid inputs", async () => {
    const response = await request(app)
        .post("/api/tickets")
        .send({
            price: 111,
            title: "Test ticket"
        })
        .expect(201)
})




