import request from "supertest"
import {app} from "../../app";

it("return a 201 on successful signup", async () => {
    return request(app)
        .post("/api/users/signup")
        .send({
            email: "test@test.com",
            password: "password"
        })
        .expect(201)
})
it("return a 400 with an invalid email", async () => {
    return request(app)
        .post("/api/users/signup")
        .send({
            email: "32323256",
            password: "password"
        })
        .expect(400)
})

it("return a 400 with an invalid password", async () => {
    return request(app)
        .post("/api/users/signup")
        .send({
            email: "test@test.com",
            password: "1"
        })
        .expect(400)
})

it("return a 400 with missing email", async () => {
    return await request(app)
        .post("/api/users/signup")
        .send({
            password: "123354343gf"
        })
        .expect(400)
})

it("return a 400 with missing password", async () => {
    return await request(app)
        .post("/api/users/signup")
        .send({
            email: "test@test.com"
        })
        .expect(400)
})
it("disallow duplicated email", async () => {
    await request(app)
        .post("/api/users/signup")
        .send({
            email: "test@test.com",
            password: "password"
        })
        .expect(201)
    await request(app)
        .post("/api/users/signup")
        .send({
            email: "test@test.com",
            password: "password"
        })
        .expect(400)
})