"use strict";

import express, {Request, Response} from "express";
import { body } from "express-validator";
import {
    MESSEGE_SUCCESS,
    STATUS_OK,
} from "../constants/data"
import { OrderService } from "../services/orderService";
import { validateRequest, BadRequestError, NotFoundRequestError } from "@dmstickets/common";
import {StripePayments} from "../services/stripePayments";
import Stripe from "stripe"
import {PaymentService} from "../services/paymentService";

const orderService = new OrderService()
const stripePayments = new StripePayments(Stripe)
const paymentService = new PaymentService()

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

    const paymentData = stripePayments.processTransaction(order)
    paymentData.then(async result => {
        await paymentService
            .setOrderId(orderId)
            .setStripeId(result.id)
            .createPayment()
        await stripePayments.approveTransaction(result.client_secret)
    })
    res.status(STATUS_OK).json({
        status: MESSEGE_SUCCESS,
        data: "",
        message: "Successful payment"
    })

})

export { router as createChargeRouter }