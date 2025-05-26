"use strict";

import express, {Request, Response} from "express";
import {
    STATUS_NO_CONTENT,
} from "../../constants/data";
import {OrderService} from "../../services/orderService";
import {NotFoundRequestError} from "@dmstickets/common";
import {OrderCancelledPublisher} from "../../events/publishers/order-cancelled-publisher";
import {natsWrapper} from "../../nats-wrapper";

const service = new OrderService()

const router = express.Router()
router.delete("/api/orders/:id", [
], async (req: Request, res: Response) => {
    const { id } = req.params
    // get orders
    const order = await service
        .setId(id)
        .getOrder()
    // check if order exists
    if (!order) throw new NotFoundRequestError("Order didn't exists!")
    // delete order
    await service
        .setId(id)
        .deleteOrder()
    // publish event
    await new OrderCancelledPublisher(natsWrapper.client).publish({
        id: order.id, ticket: {id: "" + order.ticketId +  ""}
    })
    res.status(STATUS_NO_CONTENT).send(); // No content response
})

export { router as deleteOrderRouter }