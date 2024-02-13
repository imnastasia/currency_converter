const { getCurrencyRate } = require('./currencyRate');

async function convert(fromCurrency, toCurrency, amount) {
  try {
    const {rate, method, error} = await getCurrencyRate(fromCurrency, toCurrency);
    if (error) {
      return { convertedAmount: null, error: error };
    }
    const convertedAmount = method == 'buy' ? amount * rate : amount / rate;

    return { convertedAmount: Math.round(convertedAmount * 100) / 100, error: null };
  } catch (error) {
    console.error('Error converting currency:', error);
    return { convertedAmount: null, error: 'Error converting currency' };
  }
}

module.exports = {
  convert
};
