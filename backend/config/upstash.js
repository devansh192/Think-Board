import {Ratelimit} from '@upstash/ratelimit'; 
import { Redis } from "@upstash/redis";

import dotenv from 'dotenv';
dotenv.config();

// Create a new ratelimiter, that allows 100 requests per 1 minute
const redis = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(100, '1 m'), 
});

export default redis;