"use strict";

const mongoose = require('mongoose')
const {config} = require("dotenv")
config()
import {LoggerService} from "../services/LoggerService";

const logger = new LoggerService()
    .createLogger()

export class MongoDbConnect {
    constructor() {
        const DB_NAME = process.env.NODE_ENV === 'test' ?
            process.env.MONGO_DB_NAME +  "_test" : process.env.MONGO_DB_NAME
        console.log(`Database ${DB_NAME} establishing connection`)
        mongoose.connect(process.env.MONGO_URL + '/' + DB_NAME)
            .then(() => {
                console.log('MongoDb connection established!')
            })
            .catch((error: object) => {
                logger.error(error)
            })
    }
}