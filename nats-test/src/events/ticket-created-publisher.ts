"use strict";

import {BasePublisher} from "./base-publisher";
import {TicketCreatedEvents} from "./ticket-created-events";
import {Subjects} from "./subjects";

export class TicketCreatedPublisher extends BasePublisher<TicketCreatedEvents> {
    subject: Subjects.TicketCreated = Subjects.TicketCreated

}