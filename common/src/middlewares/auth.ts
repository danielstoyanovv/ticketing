"use strict";

import {Request, Response, NextFunction } from "express";
import {TokenManager} from "../services/tokenManager";
import {ForbiddenRequestError} from "../errors/forbidden-request-error";
import {UnauthorizedRequestError} from "../errors/unauthorized-request-error";

const tokenManager = new TokenManager()
export const auth = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.session?.jwt) throw new UnauthorizedRequestError("Authentication token is not provided.")
    const token = req.session.jwt
    if (token) {
        const currentToken = tokenManager
            .setToken(token)
        const expired =  await currentToken.isExpired()
        if (expired) throw new ForbiddenRequestError("Invalid or expired token.")
    }
    next();
}
