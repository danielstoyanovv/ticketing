"use strict";

require('dotenv').config()
import {MongoDbConnect} from "./config/MongoDbConnect";
import {app} from "./app"
import {natsWrapper} from "./nats-wrapper";
import {TicketCreatedListener} from "./listeners/ticket-created-listener";
import {TicketUpdatedListener} from "./listeners/ticket-updated-listener";
import {ExpirationCompleteListener} from "./listeners/expiration-complete-listener";
import {PaymentCreatedListener} from "./listeners/payment-created-listener";

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

new TicketCreatedListener(natsWrapper.client).listen()
new TicketUpdatedListener(natsWrapper.client).listen()
new ExpirationCompleteListener(natsWrapper.client).listen()
new PaymentCreatedListener(natsWrapper.client).listen()

const port = process.env.ORDERS_PORT || 6000

const database = new MongoDbConnect()
app.listen(port, () => {
    console.log(`listening on port ${port}`)
})
