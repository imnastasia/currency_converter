const express = require("express");
const router = express.Router();
const { performConvert } = require('../controllers/converterController');
const { validateCurrencyConversion } = require('../validators/validateCurrencyConversion');

router.post('/convert', validateCurrencyConversion, performConvert);

module.exports = router;