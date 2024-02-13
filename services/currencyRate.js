const { fetchCurrencyData } = require('./currencyData');
const { currencyCodes } = require('../constants/currencyCodes');

async function getCurrencyRate(fromCurrency, toCurrency) {
  try {
    const { currencyData, error } = await fetchCurrencyData();
    if (error) {
      return { rate: null, method: null, error: error };
    }

    const fromCurrencyNumber = await getCurrencyNumber(fromCurrency);
    const toCurrencyNumber = await getCurrencyNumber(toCurrency);

    let rate, method;
    currencyData.find((currency) => {
      if (currency.currencyCodeA === fromCurrencyNumber && currency.currencyCodeB === toCurrencyNumber) {
        rate = currency.rateBuy;
        method = 'buy';
        return rate; // Return the rate once rateBuy is assigned
      } else if (currency.currencyCodeA === toCurrencyNumber && currency.currencyCodeB === fromCurrencyNumber) {
        rate = currency.rateSell;
        method = 'sell';
        return rate; // Return the rate once rateSell is assigned
      }
    });
    return { rate: rate, method: method, error: null };
  } catch (error) {
    console.error('Error getting currency rate:', error);
    return { rate: null, method: null, error: 'Error getting currency rate' };
  }
}

async function getCurrencyNumber(currencyCode) {
  const codes = currencyCodes;
  const currency = codes.find((currency) => currency.code === currencyCode);
  return parseInt(currency.number, 10);
}

module.exports = {
  getCurrencyRate,
};