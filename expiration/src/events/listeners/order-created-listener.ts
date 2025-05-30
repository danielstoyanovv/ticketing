"use strict";

import {Message} from "node-nats-streaming";
import {BaseListener, Subjects, OrderCreatedEvent} from "@dmstickets/common";
import {queueGroupName} from "./queue-group-name";
import {expirationQueue} from "../../queues/expiration-queue";

export class OrderCreatedListener extends BaseListener<OrderCreatedEvent>{
    async onMessage(data: OrderCreatedEvent["data"], msg: Message): Promise<void> {
        const delay = new Date(data.expiredAt).getTime() - new Date().getTime()
        console.log("Waiting this many milliseconds to process the job:", delay)
        await expirationQueue.add({
            orderId: data.id
        }, {
            delay
        })
        msg.ack()
    }

    queueGroupName = queueGroupName
    subject: Subjects.OrderCreated = Subjects.OrderCreated
}