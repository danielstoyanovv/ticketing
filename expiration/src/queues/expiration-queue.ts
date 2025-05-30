"use strict";

import {Queue} from "bull";
import {config} from "dotenv"
config()
import {Payload} from "./payload";

const expirationQueue = new Queue<Payload>("order:expiration", {
    redis: {
        host: process.env.REDIS_URL
    }
})

expirationQueue.process(async (job) => {
    console.log(
        "I want to publish an expiration:complete event for orderId"
        , job.data.orderId
    )
})

export { expirationQueue }