"use strict";

import express, {Request, Response} from "express";
import {
    MESSEGE_SUCCESS,
    STATUS_OK
} from "../../constants/data";
import {OrderService} from "../../services/orderService";
import {NotFoundRequestError} from "@dmstickets/common";

const service = new OrderService()

const router = express.Router()
router.get("/api/orders/:id", [
], async (req: Request, res: Response) => {
    const { id } = req.params
    const order = await service
        .setId(id)
        .getOrder()
    if (!order) throw new NotFoundRequestError("Order didn't exists!")
    res.status(STATUS_OK).json({
        status: MESSEGE_SUCCESS,
        data: order,
        message: ""
    })

})

export { router as showOrderRouter }