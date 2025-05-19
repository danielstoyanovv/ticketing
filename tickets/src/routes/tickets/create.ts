"use strict";

import express, {Request, Response} from "express";
import { body,  } from "express-validator";
import { validateRequest} from "@dmstickets/common";
import {TicketService} from "../../services/ticketService";
import {MESSEGE_SUCCESS, STATUS_CREATED} from "../../constants/data";
import {Redis} from "../../services/redis";
import {TicketCreatedPublisher} from "../../events/publishers/ticket-created-publisher";
import {natsWrapper} from "../../nats-wrapper";

const redisClient = new Redis().createClient()

const router = express.Router()
router.post("/api/tickets", [
    body("title")
        .trim()
        .notEmpty()
        .isLength({ min: 5, max: 30 })
        .withMessage("Title should be between 5 and 30 characters"),
    body("price")
        .trim()
        .notEmpty()
        .isFloat({ gt: 0 })
        .withMessage("Price must be float value greater than 0"),
    validateRequest,
], async (req: Request, res: Response) => {
    const {title, price} = req.body
    const service = new TicketService()
    // create ticket
    const ticket = await service
        .setTitle(title)
        .setPrice(price)
        .createTicket()
    // invalidate cache
    await redisClient.del("tickets")
    const resourcesURI =  `/api/tickets/${ticket.id}`
    // publish event
    await new TicketCreatedPublisher(natsWrapper.client).publish({
        id: ticket.id,
        title: ticket.title,
        price: ticket.price
    })
    res.status(STATUS_CREATED).json({
        status: MESSEGE_SUCCESS,
        data: resourcesURI,
        message: ""
    })
})

export { router as createTicketRouter }