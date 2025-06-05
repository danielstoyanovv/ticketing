"use strict";

import {Message} from "node-nats-streaming";
import {BaseListener, Subjects, PaymentCreatedEvent} from "@dmstickets/common";
import {queueGroupName} from "./queue-group-name";
import {OrderService} from "../services/orderService";

const orderService = new OrderService()

export class PaymentCreatedListener extends BaseListener<PaymentCreatedEvent>{
    async onMessage(data: PaymentCreatedEvent["data"], msg: Message): Promise<void> {
        const order = await orderService
            .setId(data.orderId)
            .getOrder()
        if (!order) throw new Error("Order not found")
        await order
            .setId(order.id)
            .setStatus("complete")
            .setExpiredAt(order.expiredAt)
            .setTicketId(order.ticketId)
            .updateOrder()
        msg.ack()
    }

    queueGroupName = queueGroupName
    subject: Subjects.PaymentCreated = Subjects.PaymentCreated
}a