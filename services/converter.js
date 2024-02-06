const { getCurrencyRate } = require('./currencyRate');

async function convert(fromCurrency, toCurrency, amount) {
  try {
    const [rate, method] = await getCurrencyRate(fromCurrency, toCurrency);
    const convertedAmount = method == 'buy' ? amount * rate : amount / rate;

    return Math.round(convertedAmount * 100) / 100;
  } catch (error) {
    console.error('Error converting currency:', error);
    throw error;
  }
}

module.exports = {
  convert
};
