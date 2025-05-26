"use strict";

import {Subjects} from "./subjects";

export interface OrderCreatedEvent {
    subject: Subjects.OrderCreated,
    data: {
        id: string,
        status: string,
        expiredAt: Date,
        ticket: {
            id: string,
            price: Number
        }
    }
}