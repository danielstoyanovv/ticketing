"use strict";

import express, {Request, Response} from "express";
import {
    MESSEGE_SUCCESS,
    STATUS_OK
} from "../../constants/data";
import {TicketService} from "../../services/ticketService";
import {Redis} from "../../services/redis";
import {getCachedTickets} from "../../middlewares/getCachedTickets";

const service = new TicketService()
const redisClient = new Redis().createClient()

const router = express.Router()

router.get("/api/tickets", [
    getCachedTickets
], async (req: Request, res: Response) => {
    const limit: any = req.query.limit ?? null
    const tickets = service
        .setLimit(limit)
        .getTickets()
    tickets.then(async result => {
        req.query.limit != undefined ?
            await redisClient.del("tickets") : await redisClient.setEx("tickets", 600, JSON.stringify(result));
        res.status(STATUS_OK).json({
            status: MESSEGE_SUCCESS,
            data: {
                result,
                "total": result.length
            },
            message: ""
        })
    })

})

export { router as allTicketsRouter }