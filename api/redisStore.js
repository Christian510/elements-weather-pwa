
import dotenv from 'dotenv';
import { RedisStore } from 'connect-redis';
import { createClient } from 'redis';
dotenv.config({ path: './.env' });
const redisHost = process.env.REDIS_HOST;
const redisPort = process.env.REDIS_PORT;

// Initialize client.
const redisClient = createClient({
    host: redisHost,
    port: redisPort,
})
redisClient.connect().catch(console.error)

const redisStore = new RedisStore({
    client: redisClient,
    prefix: 'myapp:',
    // ttl: 30 * 24 * 60 * 60 // 30 days
    });

export default redisStore;