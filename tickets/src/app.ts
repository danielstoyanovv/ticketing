"use strict";

import express from "express"
import "express-async-errors"
require('dotenv').config()
import helmet from "helmet";
import cors from "cors"
import {errorHandler} from "@dmstickets/common";
import cookieSession from "cookie-session";
import {createTicketRouter} from "./routes/tickets/create";
import {oneTicketRouter} from "./routes/tickets/one";
import {allTicketsRouter} from "./routes/tickets/all";
import {patchTicketRouter} from "./routes/tickets/update";
import {deleteTicketRouter} from "./routes/tickets/delete";

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

app.use(createTicketRouter)
app.use(oneTicketRouter)
app.use(allTicketsRouter)
app.use(patchTicketRouter)
app.use(deleteTicketRouter)
app.use(errorHandler)
export default { app }