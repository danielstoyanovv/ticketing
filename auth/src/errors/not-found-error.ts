"use strict";

import {CustomError} from "./custom-error";
import {STATUS_NOT_FOUND} from "../constants/data";

export class NotFoundError extends CustomError {
    statusCode = STATUS_NOT_FOUND;
    constructor(public error: string) {
        super("Route not found");
        Object.setPrototypeOf(this, NotFoundError.prototype)

    }

    serializeErrors() {
        return [{message: this.error}]
    }
}