"use strict";

import express, {Request, Response} from "express";
import { body,  } from "express-validator";
import {validateRequest, auth, NotFoundRequestError} from "@dmstickets/common";
import {TicketService} from "../../services/ticketService";
import {MESSEGE_SUCCESS, STATUS_PATCH} from "../../constants/data";
import {Redis} from "../../services/redis";

const redisClient = new Redis().createClient()

const router = express.Router()
router.patch("/api/tickets/:id", [
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
    auth
], async (req: Request, res: Response) => {
    const { id } = req.params
    const {title, price} = req.body

    const service = new TicketService()

    const ticketExists = await service
        .setId(id)
        .getTicket()
    if (!ticketExists) throw new NotFoundRequestError("Ticked didn't exists!")

    const ticket =  await service
        .setId(id)
        .setTitle(title)
        .setPrice(price)
        .updateTicket()
    // invalidate cache
    await redisClient.del("tickets")
    const cacheKey = "ticket_" + id
    await redisClient.del(cacheKey)
    res.status(STATUS_PATCH).json({
        status: MESSEGE_SUCCESS,
        data: ticket,
        message: ""
    })
})

export { router as patchTicketRouter }