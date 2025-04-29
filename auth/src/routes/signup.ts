"use strict";

import express, {Request, Response} from "express";
import { body, validationResult } from "express-validator";
import { RequestValidationError } from "../errors/request-validation-error";

import {
    MESSEGE_SUCCESS,
    STATUS_CREATED,
} from "../constants/data"
import { UserService } from "../services/UserService";
import { BadRequestError } from "../errors/bad-request-error";
import { Password } from "../services/password";
import { Token } from "../services/token";

const router = express.Router()

router.post("/api/users/signup", [
    body("email")
        .isEmail()
        .withMessage("Email is not valid"),
    body("password")
        .trim()
        .isLength({ min: 4, max: 20 })
        .withMessage("Password must be between 4 and 20 characters")

], async (req: Request, res: Response) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) throw new RequestValidationError(errors.array())

    const { email } = req.body

    const password = await Password
        .toHash(req.body.password)

    const service = new UserService()
    const exists = await service
        .setEmail(email)
        .userExists()
    if (exists) throw new BadRequestError("Email in use")

    const user = await service
        .setEmail(email)
        .setPassword(password)
        .createUser()

    const token = new Token()
    const userToken = token
        .setId(user.id)
        .setEmail(email)
        .generateToken()

    const data = {
        token: userToken,
        logged_user_id: user.id
    }
    res.status(STATUS_CREATED).json({
        status: MESSEGE_SUCCESS,
        data,
        message: "Successfully registration"
    })

})

export { router as signupRouter }