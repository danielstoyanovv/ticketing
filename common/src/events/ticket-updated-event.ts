"use strict";

import {Subjects} from "./subjects";

export interface TicketUpdatedEvent {
    subject: Subjects.TicketUpdated,
    data: {
        id: string,
        title: string,
        price: number,
        orderId?: string
    }
}