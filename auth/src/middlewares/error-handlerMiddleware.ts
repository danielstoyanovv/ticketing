"use strict";

import {
    Request,
    Response,
    NextFunction
} from "express";
import {CustomError} from "../errors/custom-error";

const STATUS_BAD_REQUEST = 400

export const errorHandlerMiddleware = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (err instanceof CustomError) {
        return res.status(err.statusCode).send({ errors: err.serializeErrors() });
    }

    res.status(STATUS_BAD_REQUEST).send({
        errors: [{message: "Something went wrong"}]
    })
}