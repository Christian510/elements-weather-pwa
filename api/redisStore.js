const dotenv = require('dotenv');
const { RedisStore } = require('connect-redis');
const { createClient } = require('redis');
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

redisClient.connect();

const redisStore = new RedisStore({
    client: redisClient,
    // prefix: '',
    // ttl: 30 * 24 * 60 * 60 // 30 days
    });

// export default redisStore;
module.exports = redisStore;