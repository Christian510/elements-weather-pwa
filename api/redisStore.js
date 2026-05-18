/*
 * redisStore.js
 *
 * @description: Redis store
 *
 * @description: This file contains the redis store for the session.
 */
const dotenv = require('dotenv');
dotenv.config({ path: process.env.NODE_ENV === 'production' ? './.env.production' : './api/.env.development' });
const { RedisStore } = require('connect-redis');
const getRedisClient = require('./redisClient');
const client = getRedisClient();
const redisStore = new RedisStore({ client });

module.exports = redisStore;