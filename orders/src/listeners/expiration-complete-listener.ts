"use strict";

import {Message} from "node-nats-streaming";
import {BaseListener, Subjects, ExpirationCompleteEvent} from "@dmstickets/common";
import {queueGroupName} from "./queue-group-name";
import {OrderService} from "../services/orderService";
import {OrderCancelledPublisher} from "../events/publishers/order-cancelled-publisher";

const orderService = new OrderService()

export class ExpirationCompleteListener extends BaseListener<ExpirationCompleteEvent>{
    async onMessage(data: ExpirationCompleteEvent["data"], msg: Message): Promise<void> {
        const order = await orderService
            .setId(data.orderId)
            .getOrder()
        if (!order) throw new Error("Order not found")
        await orderService
            .setId(order.id)
            .setStatus("cancelled")
            .setExpiredAt(order.expiredAt)
            .setTicketId(order.ticketId)
            .updateOrder()
        await new OrderCancelledPublisher(this.client).publish({
            id: order.id,
            ticket: {id: order.ticketId}
        })
        msg.ack()
    }

    queueGroupName = queueGroupName
    subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete
}