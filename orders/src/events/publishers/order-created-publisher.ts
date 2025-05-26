"use strict";

import {BasePublisher, Subjects, OrderCreatedEvent} from "@dmstickets/common";

export class OrderCreatedPublisher extends BasePublisher<OrderCreatedEvent> {
    subject: Subjects.OrderCreated = Subjects.OrderCreated
}