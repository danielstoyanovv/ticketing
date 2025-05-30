"use strict";

import {Queue} from "bull";
import {config} from "dotenv"
config()
import {Payload} from "./payload";
import {ExpirationCompletePublisher} from "../events/publishers/expiration-complete-publisher";
import {natsWrapper} from "../nats-wrapper";

const expirationQueue = new Queue<Payload>("order:expiration", {
    redis: {
        host: process.env.REDIS_URL
    }
})

expirationQueue.process(async (job) => {
    await new ExpirationCompletePublisher(natsWrapper.client).publish({
        orderId: job.data.orderId

    })
})

export { expirationQueue }