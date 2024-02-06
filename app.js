const express = require('express');
const morgan = require('morgan');
const { convert } = require('./services/converter');

const app = express();
app.use(morgan('dev'));
app.use(express.json());
// listen for requests
app.listen(3000);

app.get('/', (req, res) => {
  res.send('This is a currency converter API');
});

app.post('/convert', async (req, res) => {
  const { fromCurrency, toCurrency, amount } = req.body;

  if (!fromCurrency || !toCurrency || !amount) {
    return res.status(400).json({ error: 'Invalid request. Please provide fromCurrency, toCurrency, and amount.' });
  }

  // TODO: Validate the currency codes

  // Convert the currency
  const convertedAmount = await convert(fromCurrency, toCurrency, amount);

  // Return the converted amount
  res.json({ fromCurrency, toCurrency, amount, convertedAmount });
});


app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});