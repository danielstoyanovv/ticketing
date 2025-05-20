"use strict";

require('dotenv').config()
import {MongoDbConnect} from "./config/MongoDbConnect";
import {app} from "./app"
import {natsWrapper} from "./nats-wrapper";
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

const port = process.env.ORDERS_PORT || 6000

const database = new MongoDbConnect()
app.listen(port, () => {
    console.log(`listening on port ${port}`)
})
