"use strict";

import {CustomError} from "@dmstickets/common";
import {STATUS_BAD_REQUEST} from "../constants/data";

export class BadRequestError extends CustomError {
    statusCode = STATUS_BAD_REQUEST

    constructor(public message: string) {
        super(message);
        Object.setPrototypeOf(this, BadRequestError.prototype)
    }

    serializeErrors() {
        return [{ message: this.message }]
    }
}