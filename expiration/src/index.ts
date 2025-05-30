"use strict";

require('dotenv').config()
import {natsWrapper} from "./nats-wrapper";
import {OrderCreatedListener} from "./events/listeners/order-created-listener";

natsWrapper.connect("ticketing", "reehh", "http://nats-clusterip-srv:4222").then(result => {
    result.client.on("close", () => {
        console.log("NATS connection closed!")
        process.exit()
    })
    process.on("SIGINT", () => {result.client.close()})
    process.on("SIGTERM", () => {result.client.close()})
    new OrderCreatedListener(natsWrapper.client).listen()
}).catch(err => {
    console.error(err)
})
