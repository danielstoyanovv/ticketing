"use strict";

import express, {Request, Response} from "express";
import { body,  } from "express-validator";
import { validateRequest} from "@dmstickets/common";
import {TicketService} from "../../services/ticketService";

import {MESSEGE_SUCCESS, STATUS_CREATED} from "../../constants/data";

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
        .isNumeric()
        .withMessage("Price must be numeric value"),
    validateRequest
], async (req: Request, res: Response) => {
    const {title, price} = req.body
    const service = new TicketService()
    await service
        .setTitle(title)
        .setPrice(price)
        .createTicket()

    res.status(STATUS_CREATED).json({
        status: MESSEGE_SUCCESS,
        data: [],
        message: ""
    })
})

export { router as createTicketRouter }