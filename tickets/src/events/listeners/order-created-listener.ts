"use strict";

import {Message} from "node-nats-streaming";
import {BaseListener, Subjects, OrderCreatedEvent} from "@dmstickets/common";
import {queueGroupName} from "./queue-group-name";
import {TicketService} from "../../services/ticketService";
import {TicketUpdatedPublisher} from "../publishers/ticket-updated-publisher";

const ticketService = new TicketService()
export class OrderCreatedListener extends BaseListener<OrderCreatedEvent>{
    async onMessage(data: OrderCreatedEvent["data"], msg: Message): Promise<void> {
        const ticket = await ticketService
            .setId(data.ticket.id)
            .getTicket()
        if (!ticket) throw new Error("Ticket not found")

        await ticket
            .setId(data.ticket.id)
            .setTitle(ticket.title)
            .setPrice(data.ticket.price)
            .setOrderId(data.id)
            .updateTicket()
        msg.ack()
        await new TicketUpdatedPublisher(this.client).publish({
            id: ticket.id,
            title: ticket.title,
            price: ticket.price,
            orderId: ticket.orderId,
        })
    }

    queueGroupName = queueGroupName
    subject: Subjects.OrderCreated = Subjects.OrderCreated
}