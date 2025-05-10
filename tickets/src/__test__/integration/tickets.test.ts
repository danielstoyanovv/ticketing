import request from "supertest"
import {app} from "../../app";
it("return an error if an invalid title is provided", async () => {
    const response = await request(app)
        .post("/api/tickets")
        .send({
            price: 111
        })
        .expect(401)
})
it("return an error if an invalid price is provided", async () => {
    const response = await request(app)
        .post("/api/tickets")
        .send({
            title: "Test ticket"
        })
        .expect(401)
})

it("return error because user is not logged in when create a ticket with valid inputs ", async () => {
    const response = await request(app)
        .post("/api/tickets")
        .send({
            price: 111,
            title: "Test ticket"
        })
        .expect(401)
})




