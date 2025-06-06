"use strict";

import express from "express"
import "express-async-errors"
require('dotenv').config()
import helmet from "helmet";
import cors from "cors"
import {currentUserRouter} from "./routes/current-user";
import {signinRouter} from "./routes/signin";
import {signupRouter} from "./routes/signup";
import {errorHandler} from "@dmstickets/common";
import cookieSession from "cookie-session";
export const app = express()

app.set("trust proxy", false)
app.use(
    cookieSession({
        signed: false,
        secure: process.env.NODE_ENV !== "test"
    })
)

app.use(express.json())

app.use(helmet())

app.use(cors())

app.use(currentUserRouter)
app.use(signinRouter)
app.use(signupRouter)
app.use(errorHandler)
export default { app }