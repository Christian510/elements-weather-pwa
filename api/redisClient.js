/*
 * redisClient.js
 *
 * @description: Redis client
 * 
 * @description: This client fixes issues with Redis where the redis client was called on each request, creating a new connection per session middleware call.
 */

let client;

module.exports = () => {
  if (!client) {
    const { createClient } = require('redis');
    client = createClient({ url: process.env.REDIS_URL });
    client.on('error', (err) => console.log('Redis Error', err));
    client.connect();
  }
  return client;
};