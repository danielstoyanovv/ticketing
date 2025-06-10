"use strict";

import express, {Request, Response} from "express";
import {auth, currentUser} from "@dmstickets/common";

const router = express.Router()
router.get("/api/users/current-user", [
    auth,
    currentUser
], (req: Request, res: Response) => {
    res.send("How are you?")
})

export { router as currentUserRouter }