
import dotenv from 'dotenv';
import { RedisStore } from 'connect-redis';
import { createClient } from 'redis';
dotenv.config({ path: './.env.production' });

const redisClient = createClient({
    username: process.env.REDIS_USERNAME,
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
    }
});

redisClient.on('error', err => console.log('Redis Client Error', err));

await redisClient.connect();


const redisStore = new RedisStore({
    client: redisClient,
    prefix: 'elm:',
    // ttl: 30 * 24 * 60 * 60 // 30 days
    });

export default redisStore;