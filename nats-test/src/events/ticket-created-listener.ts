"use strict";

import {BaseListener} from "./base-listener";
import {Message} from "node-nats-streaming";
import {TicketCreatedEvent} from "./ticket-created-event";
import {Subjects} from "./subjects";

export class TicketCreatedListener extends BaseListener<TicketCreatedEvent> {
    queueGroupName = "payments-service";
    readonly subject = Subjects.TicketCreated

    onMessage(data: TicketCreatedEvent['data'], msg: Message) {
        console.log("Event data!", data)

        msg.ack()
    }
}