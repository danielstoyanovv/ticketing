"use strict";

const redis = require('redis');
import {config} from "dotenv"
config()
export class Redis {
    /**
     * Get Redis Client
     * @return {object}
     */
    createClient() {
        // Create Redis client
        const redisClient = redis.createClient({
            url: process.env.REDIS_URL,
        });
        redisClient.on('error', (err: any) => console.error('Redis error:', err));
        redisClient.connect().then(() => console.log('Connected to Redis'));
        redisClient.set('visits', 0)

        return redisClient
    }
}