"use strict";

import {BasePublisher, Subjects, PaymentCreatedEvent} from "@dmstickets/common";

export class PaymentCreatedPublisher extends BasePublisher<PaymentCreatedEvent> {
    subject: Subjects.PaymentCreated = Subjects.PaymentCreated

}