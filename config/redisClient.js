const { createClient } = require('redis');
const process = require('process');
require('dotenv').config();

const redisClient = createClient({
  url: process.env.REDIS_URL
});

redisClient.on('connect', function() {
  console.log('Connected to Redis');
});

redisClient.on('error', function (err) {
  console.log('Redis client error: ' + err);
});

module.exports = {
  redisClient
};
