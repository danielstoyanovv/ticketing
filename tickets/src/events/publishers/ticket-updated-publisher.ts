"use strict";

import {BasePublisher, Subjects, TicketUpdatedEvent} from "@dmstickets/common";

export class TicketUpdatedPublisher extends BasePublisher<TicketUpdatedEvent> {
    subject: Subjects.TicketUpdated = Subjects.TicketUpdated

}