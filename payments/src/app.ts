"use strict";

import express from "express"
import "express-async-errors"
require('dotenv').config()
import helmet from "helmet";
import cors from "cors"
import {errorHandler} from "@dmstickets/common";
import cookieSession from "cookie-session";
import {createChargeRouter} from "./routes/new";

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

app.use(createChargeRouter)

app.use(errorHandler)
export default { app }