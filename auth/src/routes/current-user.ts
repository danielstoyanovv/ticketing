"use strict";

import express, {Request, Response} from "express";
import {auth} from "../middlewares/auth";
import {currentUser} from "../middlewares/current-user";

const router = express.Router()
router.get("/api/users/current-user", [
    auth,
    currentUser
], (req: Request, res: Response) => {
    res.send("Hi there!")
})

export { router as currentUserRouter }