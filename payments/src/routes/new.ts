"use strict";

import express, {Request, Response} from "express";
import { body } from "express-validator";
import {
    MESSEGE_SUCCESS,
    STATUS_OK,
} from "../constants/data"
import { OrderService } from "../services/orderService";
import { validateRequest, BadRequestError, NotFoundRequestError } from "@dmstickets/common";
import {stripe} from "../services/stripe";

const orderService = new OrderService()

const router = express.Router()

router.post("/api/payments", [
    body("orderId")
        .trim()
        .notEmpty()
        .withMessage("OrderId is not valid"),
    validateRequest

], async (req: Request, res: Response) => {
    const { orderId } = req.body
    const order = await orderService
        .setId(orderId)
        .getOrder()
    if (!order) throw new NotFoundRequestError("Order not found")
    if (order.status === "cancelled") throw new BadRequestError("Order is cancelled")
    const charge = await stripe.charges.create({
        amount: order.price * 100,
        currency: 'usd',
        source: "tok_visa",
    });

    res.status(STATUS_OK).json({
        status: MESSEGE_SUCCESS,
        data: "",
        message: "Successful payment"
    })

})

export { router as createChargeRouter }