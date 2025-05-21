"use strict";

import express, {Request, Response} from "express";
import {
    STATUS_NO_CONTENT,
} from "../../constants/data";
import {OrderService} from "../../services/orderService";

const service = new OrderService()

const router = express.Router()
router.delete("/api/orders/:id", [
], async (req: Request, res: Response) => {
    const { id } = req.params
    await service
        .setId(id)
        .deleteOrder()
    res.status(STATUS_NO_CONTENT).send(); // No content response
})

export { router as deleteOrderRouter }