"use strict";

import {BaseListener} from "./base-listener";
import {Message} from "node-nats-streaming";
import {TicketCreatedEvents} from "./ticket-created-events";
import {Subjects} from "./subjects";

export class TicketCreatedListener extends BaseListener<TicketCreatedEvents> {
    queueGroupName = "payments-service";
    readonly subject = Subjects.TicketCreated

    onMessage(data: TicketCreatedEvents['data'], msg: Message) {
        console.log("Event data!", data)

        msg.ack()
    }
}