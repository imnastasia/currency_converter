const { fetchCurrencyData } = require('./currencyData');
const { currencyCodes } = require('./currencyCodes');

async function getCurrencyRate(fromCurrency, toCurrency) {
  try {
    const currencyData = await fetchCurrencyData();
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
    console.log('rate', rate);
    return [rate, method];
  } catch (error) {
    console.error('Error getting currency rate:', error);
    throw error;
  }
}

async function getCurrencyNumber(currencyCode) {
  const codes = currencyCodes;
  console.log(codes[1]);
  const currency = codes.find((currency) => currency.code === currencyCode);
  return parseInt(currency.number, 10);
}

module.exports = {
  getCurrencyRate,
};