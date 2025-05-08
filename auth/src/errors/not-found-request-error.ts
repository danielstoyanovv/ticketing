"use strict";

import {CustomError} from "@dmstickets/common";
import {STATUS_NOT_FOUND} from "../constants/data";

export class NotFoundRequestError extends CustomError {
    statusCode = STATUS_NOT_FOUND;
    constructor(public error: string) {
        super("Route not found");
        Object.setPrototypeOf(this, NotFoundRequestError.prototype)

    }

    serializeErrors() {
        return [{message: this.error}]
    }
}