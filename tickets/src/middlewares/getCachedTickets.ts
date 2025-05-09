"use strict";

import {Request, Response, NextFunction } from "express";
import {
    MESSEGE_SUCCESS,
    STATUS_OK
} from "../constants/data"
import {Redis} from "../services/redis";
export const getCachedTickets = async (req: Request, res: Response, next: NextFunction) => {
    const redisClient = new Redis().createClient()
    if (req.query.limit) {
        await redisClient.del("tickets")
    }
    const cachedData = await redisClient.get("tickets");
    if (cachedData) {
        const users = JSON.parse(cachedData)
        console.log('Cache hit');
        return res.status(STATUS_OK).json({
            status: MESSEGE_SUCCESS,
            data: {
                users,
                "total" : users.length
            },
            message: ""
        })
    }
    console.log('Cache miss');
    next();
}