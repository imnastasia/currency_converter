const express = require("express");
const router = express.Router();

router.use((req, res, next) => {
  console.log('Time: ', Date.now())
  next()
})

router.get('/health-check', (req, res) => {
  redisClient.set('key', 'value', (err) => {
    if (err) {
      res.status(500).json('Redis connection failed');
    }
  });
  res.json({status: 'OK'});
}
);

//Converter Route
const converterRoutes = require("./converterRoutes");
const { redisClient } = require("../config/redisClient");

router.use("/converter", converterRoutes);
router.get('/', (_req, res) => {
  res.json({data: 'This is a currency converter API'});
});


router.use((req, res) => {
  res.status(404).json({ title: '404' });
});

module.exports = router;