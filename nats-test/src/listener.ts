"use strict";

import nats, { Message, Stan } from "node-nats-streaming"
import {randomBytes} from "node:crypto";
import {TicketCreatedListener} from "./events/ticket-created-listener";


const stan = nats.connect("ticketing", randomBytes(4).toString("hex"), {
    url: 'http://localhost:4222',
})
stan.on("connect", () => {
    console.log("BaseListener connected to NATS")

    stan.on("close", () => {
        console.log("NATS connection closed")
        process.exit()
    })

    new TicketCreatedListener(stan).listen()
})
process.on("SIGINT", () => {stan.close()})
process.on("SIGTERM", () => {stan.close()})