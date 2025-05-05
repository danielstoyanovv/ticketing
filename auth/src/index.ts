"use strict";

require('dotenv').config()
import {MongoDbConnect} from "./config/MongoDbConnect";
import {app} from "./app"

const port = process.env.AUTH_PORT || 3000

const database = new MongoDbConnect()
app.listen(port, () => {
    console.log(`listening on port ${port}`)
})
