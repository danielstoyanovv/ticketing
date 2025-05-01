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
import {MongoDbConnect} from "./config/MongoDbConnect";

const port = process.env.AUTH_PORT || 3000

const app = express()

app.use(express.json())

app.use(helmet())

app.use(cors())

app.use(currentUserRouter)
app.use(signinRouter)
app.use(signupRouter)
app.use(errorHandler)

const database = new MongoDbConnect()
app.listen(port, () => {
    console.log(`listening on port ${port}`)
})
