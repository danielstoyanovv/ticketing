"use strict";

import express, {Request, Response} from "express";
import { body,  } from "express-validator";
import { validateRequest} from "@dmstickets/common";
import {MESSEGE_SUCCESS, STATUS_CREATED} from "../../constants/data";
import {TicketService} from "../../services/ticketService";
import {NotFoundRequestError} from "@dmstickets/common";
import {BadRequestError} from "@dmstickets/common";
import {OrderService} from "../../services/orderService";

const ticketService = new TicketService()
const orderService = new OrderService()

const router = express.Router()

const EXPIRATION_WINDOW_SECONDS = 15 * 60
router.post("/api/orders", [
    body("ticketId")
        .trim()
        .notEmpty()
        .withMessage("Ticket id must be provided"),
    validateRequest,
], async (req: Request, res: Response) => {
    const {ticketId} = req.body
    // check if ticket exist
    const ticketExists = await ticketService
        .setId(ticketId)
        .getTicket()
    if (!ticketExists) throw new NotFoundRequestError("Ticket didn't exists")
    // check if someone already reserved the ticket
    const isReserved = await ticketExists.isReserved()
    if (isReserved) throw new BadRequestError("Ticket is already reserved")
    // configure the expiration time
    const expiration = new Date()
    expiration.setSeconds(expiration.getSeconds() + EXPIRATION_WINDOW_SECONDS)
    // create order
    const order = await orderService
        .setTcketId(ticketId)
        .setExpiredAt(expiration)
        .setStatus("created")
        .createOrder()

    res.status(STATUS_CREATED).json({
        status: MESSEGE_SUCCESS,
        data: order,
        message: ""
    })
})

export { router as newOrderRouter }