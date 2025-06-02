"use strict";

import {Message} from "node-nats-streaming";
import {BaseListener, Subjects, OrderCreatedEvent} from "@dmstickets/common";
import {queueGroupName} from "./queue-group-name";
import {OrderService} from "../../services/orderService";

const orderService = new OrderService()
export class OrderCreatedListener extends BaseListener<OrderCreatedEvent>{
    async onMessage(data: OrderCreatedEvent["data"], msg: Message): Promise<void> {
        const order = await orderService
            .setId(data.id)
            .setStatus(data.status)
            .setPrice(data.ticket.price)
            .createOrder()
        msg.ack()
    }

    queueGroupName = queueGroupName
    subject: Subjects.OrderCreated = Subjects.OrderCreated
}