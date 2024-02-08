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

// listen for requests
const server = app.listen(3000);

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);

function cleanup() {
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
}

process.on('unhandledRejection', (reason, promise) => {
  console.log('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});