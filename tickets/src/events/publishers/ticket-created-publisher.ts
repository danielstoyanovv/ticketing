"use strict";

import {BasePublisher, Subjects, TicketCreatedEvent} from "@dmstickets/common";

export class TicketCreatedPublisher extends BasePublisher<TicketCreatedEvent> {
    subject: Subjects.TicketCreated = Subjects.TicketCreated

}