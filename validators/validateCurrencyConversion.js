const { check, validationResult } = require('express-validator');

const { currencyCodes } = require('../constants/currencyCodes');

const validateCurrencyCode = (value, { path }) => {
  const codes = currencyCodes;
  const currency = codes.find((currency) => currency.code === value);
  if (!currency) {
    throw new Error(`${path} must be a valid currency code`);
  }
  return true;
};

exports.validateCurrencyConversion = [
  check('fromCurrency').notEmpty().withMessage('fromCurrency is required'),
  check('fromCurrency').custom(validateCurrencyCode),
  check('toCurrency').notEmpty().withMessage('toCurrency is required'),
  check('toCurrency').custom(validateCurrencyCode),
  check('amount').notEmpty().withMessage('amount is required'),
  check('amount').isNumeric().withMessage('amount must be a number'),

  // Handle validation errors
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];