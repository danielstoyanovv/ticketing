"use strict";

import express from "express"
import "express-async-errors"
require('dotenv').config()
import helmet from "helmet";
import cors from "cors"
import {currentUserRouter} from "./routes/current-user";
import {signinRouter} from "./routes/signin";
import {signupRouter} from "./routes/signup";
import {errorHandler} from "./middlewares/error-handler";
import cookieSession from "cookie-session";
export const app = express()

app.set("trust proxy", false)
app.use(
    cookieSession({
        signed: false,

        // SET TRUE WHEN HTTPS IS AVAILABLE
        // secure: true
        secure: false
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