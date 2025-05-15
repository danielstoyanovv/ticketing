"use strict";

import {BaseListener} from "./base-listener";
import {Message} from "node-nats-streaming";

export class TicketCreatedListener extends BaseListener {
    queueGroupName = "payments-service";
    subject = "ticket:created"

    onMessage(data: any, msg: Message) {
        console.log("Event data!", data)

        msg.ack()
    }

}