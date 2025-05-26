"use strict";

import {BasePublisher, Subjects, OrderCancelledEvent} from "@dmstickets/common";

export class OrderCancelledPublisher extends BasePublisher<OrderCancelledEvent> {
    subject: Subjects.OrderCancelled = Subjects.OrderCancelled
}