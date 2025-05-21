"use strict";

import express, {Request, Response} from "express";
import {
    MESSEGE_SUCCESS,
    STATUS_OK
} from "../../constants/data";
import {OrderService} from "../../services/orderService";

const service = new OrderService()

const router = express.Router()

router.get("/api/orders", [
], async (req: Request, res: Response) => {
    const limit: any = req.query.limit ?? null
    const orders = service
        .setLimit(limit)
        .getOrders()
    orders.then(async result => {
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

export { router as ordersIndexRouter }