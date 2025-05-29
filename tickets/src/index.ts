"use strict";

require('dotenv').config()
import {MongoDbConnect} from "./config/MongoDbConnect";
import {app} from "./app"
import {natsWrapper} from "./nats-wrapper";
import {OrderCreatedListener} from "./events/listeners/order-created-listener";
import {OrderCancelledListener} from "./events/listeners/order-cancelled-listener";

natsWrapper.connect("ticketing", "reehh", "http://nats-clusterip-srv:4222").then(result => {
    result.client.on("close", () => {
        console.log("NATS connection closed!")
        process.exit()
    })
    process.on("SIGINT", () => {result.client.close()})
    process.on("SIGTERM", () => {result.client.close()})
}).catch(err => {
    console.error(err)
})

new OrderCreatedListener(natsWrapper.client).listen()
new OrderCancelledListener(natsWrapper.client).listen()

const port = process.env.TICKETS_PORT || 5000

const database = new MongoDbConnect()
app.listen(port, () => {
    console.log(`listening on port ${port}`)
})
