"use strict";

import {Request, Response, NextFunction } from "express";
import {TokenManager} from "../services/tokenManager";
import {
    MESSEGE_SUCCESS,
    STATUS_OK
} from "../constants/data"

const tokenManager = new TokenManager()
export const currentUser = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.session?.jwt) {
        return next();
    }
    const token = req.session.jwt
    if (token) {
        const currentToken = tokenManager
            .setToken(token)
        const currentUser = await currentToken.extractData()
        return res.status(STATUS_OK).json({
            status: MESSEGE_SUCCESS,
            data: currentUser,
            message: ""
        })
    }
    next();
}