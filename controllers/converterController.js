const { convert } = require('../services/converter');
const { asyncHandler } = require("../middlewares/asyncHandler");

const performConvert = asyncHandler(async (req, res) => {
  const { fromCurrency, toCurrency, amount } = req.body;

  // Convert the currency
  const { convertedAmount, error } = await convert(fromCurrency, toCurrency, amount);
  if (error) {
    return res.status(500).json({ error: error });
  }

  // Return the converted amount
  res.json({ fromCurrency, toCurrency, amount, convertedAmount });
});


module.exports = {
  performConvert
};