"use strict";

import express, {Request, Response} from "express";
import { body } from "express-validator";
import {
    MESSEGE_SUCCESS,
    STATUS_CREATED,
} from "../constants/data"
import { UserService } from "../services/UserService";
import { Password } from "../services/password";
import { validateRequest, BadRequestError } from "@dmstickets/common";

const router = express.Router()

router.post("/api/users/signup", [
    body("email")
        .isEmail()
        .withMessage("Email is not valid"),
    body("password")
        .trim()
        .notEmpty()
        .isLength({ min: 4, max: 20 })
        .withMessage("Password must be between 4 and 20 characters"),
    validateRequest

], async (req: Request, res: Response) => {
    const { email } = req.body

    const password = await Password
        .toHash(req.body.password)

    const service = new UserService()
    const exists = await service
        .setEmail(email)
        .userExists()
    if (exists) throw new BadRequestError("Email in use")

    await service
        .setEmail(email)
        .setPassword(password)
        .createUser()

    res.status(STATUS_CREATED).json({
        status: MESSEGE_SUCCESS,
        data: "",
        message: "Successfully registration"
    })

})

export { router as signupRouter }