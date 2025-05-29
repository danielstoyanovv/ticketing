"use strict";

import {Message} from "node-nats-streaming";
import {BaseListener, Subjects, OrderCancelledEvent} from "@dmstickets/common";
import {queueGroupName} from "./queue-group-name";
import {TicketService} from "../../services/ticketService";
import {TicketUpdatedPublisher} from "../publishers/ticket-updated-publisher";

const ticketService = new TicketService()
export class OrderCancelledListener extends BaseListener<OrderCancelledEvent>{
    async onMessage(data: OrderCancelledEvent["data"], msg: Message): Promise<void> {
        const ticket = await ticketService
            .setId(data.ticket.id)
            .getTicket()
        if (!ticket) throw new Error("Ticket not found")

        await ticket
            .setId(data.ticket.id)
            .setTitle(ticket.title)
            .setPrice(ticket.price)
            .setOrderId("")
            .updateTicket()
        await new TicketUpdatedPublisher(this.client).publish({
            id: ticket.id,
            orderId: ticket.orderId,
            price: ticket.price,
            title: ticket.title
        })
        msg.ack()
    }

    queueGroupName = queueGroupName
    subject: Subjects.OrderCancelled = Subjects.OrderCancelled
}