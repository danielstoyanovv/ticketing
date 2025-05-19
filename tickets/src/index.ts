"use strict";

require('dotenv').config()
import {MongoDbConnect} from "./config/MongoDbConnect";
import {app} from "./app"
import {natsWrapper} from "./nats-wrapper";
    natsWrapper.connect("ticketing", "reehh", "http://nats-clusterip-srv:4222").then(result => {
        console.log(result)
    }).catch(err => {
        console.error(err)
    })

const port = process.env.TICKETS_PORT || 5000

const database = new MongoDbConnect()
app.listen(port, () => {
    console.log(`listening on port ${port}`)
})
