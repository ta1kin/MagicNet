import Redis from 'ioredis'
import { REDIS_PORT, REDIS_HOST } from '../config/config.server'


export const redis = new Redis({
    port: REDIS_PORT,
    host: REDIS_HOST,
})