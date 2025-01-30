import { RedisStore } from 'connect-redis';
import { createClient } from 'redis';

// Initialize client.
let redisClient = createClient({
    host: 'localhost',
    port: 6379
})
redisClient.connect().catch(console.error)

const redisStore = new RedisStore({
    client: redisClient,
    prefix: 'myapp:',
    // ttl: 30 * 24 * 60 * 60 // 30 days
    });

export default redisStore;