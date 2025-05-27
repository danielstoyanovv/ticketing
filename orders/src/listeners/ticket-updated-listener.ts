"use strict";

import {Message} from "node-nats-streaming";
import {BaseListener, Subjects, TicketUpdatedEvent} from "@dmstickets/common";
import {queueGroupName} from "./queue-group-name";
import {TicketService} from "../services/ticketService";

const ticketService = new TicketService()

export class TicketUpdatedListener extends BaseListener<TicketUpdatedEvent>{
    async onMessage(data: TicketUpdatedEvent["data"], msg: Message): Promise<void> {
        const ticket = await ticketService
            .setId(data.id)
            .getTicket()
        if (!ticket) throw new Error("Ticket didn't exists")
        const { title, price } = data
        await ticketService
            .setId(data.id)
            .setTitle(title)
            .setPrice(price)
            .updateTicket()

        msg.ack()
    }

    queueGroupName = queueGroupName
    subject: Subjects.TicketUpdated = Subjects.TicketUpdated

}