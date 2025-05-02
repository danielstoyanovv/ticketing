"use strict";

import {Request, Response, NextFunction } from "express";
import {TokenManager} from "../services/tokenManager";
import {UnauthorizedRequestError} from "../errors/unauthorized-request-error";
import {ForbiddenRequestError} from "../errors/forbidden-request-error";

const tokenManager = new TokenManager()
export const auth = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.session?.jwt) {
        return next();
    }
    const token = req.session.jwt
    // const token = req.body.token || req.query.token || req.headers['x-access-token'] || false
    if (!token) throw new UnauthorizedRequestError("Token is missing in this request!")

    if (token) {
        const currentToken = tokenManager
            .setToken(token)
        const expired =  await currentToken.isExpired()
        if (expired) throw new ForbiddenRequestError("Invalid or expired token.")
    }
    next();
}