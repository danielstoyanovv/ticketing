"use strict";

import {Request, Response, NextFunction } from "express";
import {
    MESSEGE_SUCCESS,
    STATUS_OK
} from "../constants/data"
import {Redis} from "../services/redis";

export const getCachedTicket = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params
    const cacheKey = "ticket_" + id
    const redisClient = new Redis().createClient()
    const cachedData = await redisClient.get(cacheKey);
    if (cachedData) {
        const ticket = JSON.parse(cachedData)
        console.log('Cache hit');
        return res.status(STATUS_OK).json({
            status: MESSEGE_SUCCESS,
            data: ticket,
            message: ""
        })
    }
    console.log('Cache miss');
    next();
}