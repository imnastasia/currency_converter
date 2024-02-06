# Currency Converter API

This is a simple currency converter API that uses the [Monobank Public API](https://api.monobank.ua/docs) to get the currency conversion rates. 
It also utilizes Redis to cache the currency rates for 1 hour.

## Request Sample
```bash
curl -X POST -H "Content-Type: application/json" -d '{
    "fromCurrency": "USD",
    "toCurrency": "EUR",
    "amount": 100
}' http://localhost:3000/convert
```

## Response Sample
```bash
{
    "fromCurrency": "USD",
    "toCurrency": "EUR",
    "amount": 100,
    "convertedAmount": 88.0
}
```
