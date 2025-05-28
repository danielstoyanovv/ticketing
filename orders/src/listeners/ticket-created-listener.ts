"use strict";

import {Message} from "node-nats-streaming";
import {BaseListener, Subjects, TicketCreatedEvent} from "@dmstickets/common";
import {queueGroupName} from "./queue-group-name";
import {TicketService} from "../services/ticketService";

const ticketService = new TicketService()

export class TicketCreatedListener extends BaseListener<TicketCreatedEvent>{
    async onMessage(data: TicketCreatedEvent["data"], msg: Message): Promise<void> {
        const {id, title, price} = data
        // create a new ticket
        const ticket = await ticketService
            .setId(id)
            .setTitle(title)
            .setPrice(price)
            .createTicket()

        msg.ack()
    }

    queueGroupName = queueGroupName
    subject: Subjects.TicketCreated = Subjects.TicketCreated

}