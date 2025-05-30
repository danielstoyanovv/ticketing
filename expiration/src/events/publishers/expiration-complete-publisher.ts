"use strict";

import {BasePublisher, Subjects, ExpirationCompleteEvent} from "@dmstickets/common";

export class ExpirationCompletePublisher extends BasePublisher<ExpirationCompleteEvent> {
    subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete
}