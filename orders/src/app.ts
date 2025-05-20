"use strict";

import express from "express"
import "express-async-errors"
require('dotenv').config()
import helmet from "helmet";
import cors from "cors"
import {errorHandler} from "@dmstickets/common";
import cookieSession from "cookie-session";
import {ordersIndexRouter} from "./routes/orders";
import {deleteOrderRouter} from "./routes/orders/delete";
import {showOrderRouter} from "./routes/orders/show";
import {newOrderRouter} from "./routes/orders/new";

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

app.use(ordersIndexRouter)
app.use(deleteOrderRouter)
app.use(showOrderRouter)
app.use(newOrderRouter)
app.use(errorHandler)
export default { app }