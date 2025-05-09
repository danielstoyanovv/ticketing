"use strict";

import express, {Request, Response} from "express";
import {
    MESSEGE_SUCCESS,
    STATUS_OK
} from "../../constants/data";
import {TicketService} from "../../services/ticketService";
import {Redis} from "../../services/redis";
import {getCachedTicket} from "../../middlewares/getCachedTicket";

const redisClient = new Redis().createClient()

const router = express.Router()
router.get("/api/tickets/:id", [
    getCachedTicket
], async (req: Request, res: Response) => {
    const { id } = req.params
    const service = new TicketService
    const ticket = await service
        .setId(id)
        .getTicket()
    const cacheKey = "ticket_" + id
    await redisClient.setEx(cacheKey, 600, JSON.stringify(ticket)); // Cache data for 10 minutes
    res.status(STATUS_OK).json({
        status: MESSEGE_SUCCESS,
        data: ticket,
        message: ""
    })

})

export { router as oneTicketRouter }