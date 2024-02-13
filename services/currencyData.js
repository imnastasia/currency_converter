const axios = require('axios');
const { redisClient } = require('../config/redisClient');

async function fetchCurrencyData() {
  try {
    // Check if the data is already cached in Redis
    const cachedData = await getCurrencyDataFromCache();
    if (cachedData) {
      return { currencyData: cachedData, error: null };
    }

    const response = await axios.get('https://api.monobank.ua/bank/currency');
    const currencyData = response.data;
    // Cache the data in Redis
    await cacheCurrencyData(currencyData);

    return { currencyData, error: null };
  } catch (error) {
    console.error('Error fetching currency data:', error);
    return { currencyData: null, error: 'Error fetching currency data' };
  }
}

async function getCurrencyDataFromCache() {
  try {
    const currencyData = await redisClient.get('currencyData');
    console.log('success getting currency data from cache');
    return JSON.parse(currencyData);
  } catch (error) {
    console.log('error getting currency data from cache');
    throw error;
  }
}

async function cacheCurrencyData(data) {
  try {
    redisClient.set('currencyData', JSON.stringify(data), { 'EX': 3600 });
    console.log('success setting currency data from cache');
  } catch (error) {
    console.log('error setting currency data from cache');
    throw error;
  }
}

module.exports = {
  fetchCurrencyData
};
