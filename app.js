const express = require('express');
const morgan = require('morgan');
const process = require('process');
const { redisClient } = require('./config/redisClient');

const app = express();
app.use(morgan('dev'));
app.use(express.json());

//Routes
const indexRoutes = require("./routes/indexRoutes");
app.use("/", indexRoutes);

(async () => {
  await redisClient.connect();

  const server = app.listen(3000)
  process.on('SIGINT', cleanup);
  process.on('SIGTERM', cleanup);

  function cleanup() {
    setTimeout(() => {
      console.log('Starting cleanup.');
      // Stop the server
      server.close((err) => {
        if (err) {
          console.error('Error stopping server:', err);
        } else {
          console.log('Server stopped.');
          // Close the Redis client
          redisClient.quit((err) => {
            if (err) {
              console.error('Error closing Redis connection:', err);
            } else {
              console.log('Redis connection closed.');
            }
          });
          process.exit(0);
        }
      });
    }, 1000);
  }

  process.on('unhandledRejection', (reason, promise) => {
    console.log('Unhandled Rejection at:', promise, 'reason:', reason);
    process.exit(1);
  });
})();

//1. Count the number of tries
//2. Add a delay of 10 second
//3. on the second try, it should return close the server and close the redis connection
