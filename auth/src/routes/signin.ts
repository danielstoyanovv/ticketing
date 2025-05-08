"use strict";

import express, {Request, Response} from "express";
import { body,  } from "express-validator";
import { validateRequest } from "@dmstickets/common";
import { UserService } from "../services/UserService";
import {BadRequestError} from "../errors/bad-request-error";
import {Password} from "../services/password";
import { Token } from "../services/token";
import {NotFoundRequestError} from "../errors/not-found-request-error";
import {MESSEGE_SUCCESS, STATUS_OK} from "../constants/data";

const router = express.Router()
router.post("/api/users/signin", [
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
    const {email, password} = req.body

    const service = new UserService()
    const existsUser = await service
        .setEmail(email)
        .userExists()
    if (!existsUser) throw new NotFoundRequestError("This user didn't exists")

    const passwordsMatch =  await Password.compare(
        existsUser.password,
        password
    )
    if (!passwordsMatch) throw new BadRequestError("Invalid credentials")

    const token = new Token()
    const userToken = await token
        .setId(existsUser.id)
        .setEmail(email)
        .generateToken()

    const data = {
        logged_user_id: existsUser.id
    }

    req.session = {
        jwt: userToken
    };


    res.status(STATUS_OK).json({
        status: MESSEGE_SUCCESS,
        data,
        message: ""
    })
})

export { router as signinRouter }