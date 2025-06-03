"use strict";

import {Message} from "node-nats-streaming";
import {BaseListener, Subjects, OrderCancelledEvent} from "@dmstickets/common";
import {queueGroupName} from "./queue-group-name";
import {OrderService} from "../../services/orderService";

const orderService = new OrderService()
export class OrderCancelledListener extends BaseListener<OrderCancelledEvent>{
    async onMessage(data: OrderCancelledEvent["data"], msg: Message): Promise<void> {
        const order = await orderService
            .setId(data.id)
            .getOrder()
        if (!order) throw new Error("Order not found")
        await orderService
            .setId(order.id)
            .setStatus("cancelled")
            .setPrice(order.price)
            .updateOrder()
        msg.ack()
    }
    queueGroupName = queueGroupName
    subject: Subjects.OrderCancelled = Subjects.OrderCancelled
}