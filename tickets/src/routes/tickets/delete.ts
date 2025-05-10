"use strict";

import express, {Request, Response} from "express";
import {
    STATUS_NO_CONTENT,
} from "../../constants/data";
import {Redis} from "../../services/redis";
import {TicketService} from "../../services/ticketService";
import {auth} from "@dmstickets/common";

const service = new TicketService()
const redisClient = new Redis().createClient()

const router = express.Router()

router.delete("/api/tickets/:id", [
    auth
], async (req: Request, res: Response) => {
    const { id } = req.params
    await service
        .setId(id)
        .deleteTicket()
    // refresh cached data
    await redisClient.del("tickets")
    const cacheKey = "ticket_" + id
    await redisClient.del(cacheKey)
    res.status(STATUS_NO_CONTENT).send(); // No content response
})

export { router as deleteTicketRouter }