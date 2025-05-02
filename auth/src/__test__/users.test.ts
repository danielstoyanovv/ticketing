import request from "supertest"
import {app} from "../app";

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

it("sets a cookie after successful sign in", async () => {
    await request(app)
        .post("/api/users/signup")
        .send({
            email: "test@test.com",
            password: "password"
        })
        .expect(201)
    const response = await request(app)
        .post("/api/users/signin")
        .send({
            email: "test@test.com",
            password: "password"
        })
        .expect(200)
    expect(response.get("Set-Cookie")).toBeDefined()
})

it("fails when a email that does not exists is used", async () => {
    await request(app)
        .post("/api/users/signin")
        .send({
            email: "test_323232@test.com",
            password: "3232332"
        })
        .expect(404)
})

it("fails when an incorrect password is used", async () => {
    await request(app)
        .post("/api/users/signup")
        .send({
            email: "test@test.com",
            password: "password"
        })
        .expect(201)
    await request(app)
        .post("/api/users/signin")
        .send({
            email: "test@test.com",
            password: "123456trr"
        })
        .expect(400)
})

it("response with a cookie when given a valid credentials", async () => {
    await request(app)
        .post("/api/users/signup")
        .send({
            email: "test@test.com",
            password: "password"
        })
        .expect(201)
    const response = await request(app)
        .post("/api/users/signin")
        .send({
            email: "test@test.com",
            password: "password"
        })
        .expect(200)
    expect(response.get("Set-Cookie")).toBeDefined()
})