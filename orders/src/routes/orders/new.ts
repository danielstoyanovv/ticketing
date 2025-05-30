"use strict";

import express, {Request, Response} from "express";
import { body,  } from "express-validator";
import { validateRequest} from "@dmstickets/common";
import {MESSEGE_SUCCESS, STATUS_CREATED} from "../../constants/data";
import {TicketService} from "../../services/ticketService";
import {NotFoundRequestError} from "@dmstickets/common";
import {BadRequestError} from "@dmstickets/common";
import {OrderService} from "../../services/orderService";
import {OrderCreatedPublisher} from "../../events/publishers/order-created-publisher";
import {natsWrapper} from "../../nats-wrapper";

const ticketService = new TicketService()
const orderService = new OrderService()

const router = express.Router()

const EXPIRATION_WINDOW_SECONDS = 60
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
    const resourcesURI = `/api/orders/${order.id}`
    // publish event
    await new OrderCreatedPublisher(natsWrapper.client).publish({
        expiredAt: order.expiredAt.toISOString(),
        id: order.id,
        status: order.status,
        ticket: {
            id: "" + ticketExists.id + "",
            price: ticketExists.price
        }
    })
    res.status(STATUS_CREATED).json({
        status: MESSEGE_SUCCESS,
        data: resourcesURI,
        message: ""
    })
})

export { router as newOrderRouter }