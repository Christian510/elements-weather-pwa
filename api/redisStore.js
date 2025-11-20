const dotenv = require('dotenv');
const { RedisStore } = require('connect-redis');
const { createClient } = require('redis');
dotenv.config({ path: './.env.development' });

const redisClient = createClient({
    // url: process.env.REDIS_URL,
    username: process.env.REDIS_USERNAME,
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
    }
});

redisClient.on('error', err => console.log('Redis Client Error', err));

redisClient.connect();

// console.log(`Redis connected on ${process.env.REDIS_URL || 'localhost:6379'}`);

const redisStore = new RedisStore({
    client: redisClient,
    // prefix: '',
    // ttl: 30 * 24 * 60 * 60 // 30 days
    });

module.exports = redisStore;