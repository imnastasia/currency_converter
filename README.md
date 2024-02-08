# Currency Converter API
This is a simple currency converter API in Node.js

## Description

This application allows you to convert currencies using the latest exchange rates. It fetches the exchange rates from a third-party [Monobank Public API](https://api.monobank.ua/docs/) and performs currency conversion.
It also utilizes Redis to cache the currency rates for 1 hour.

## Installation
Make sure you have Node.js and Redis is installed on your machine. Redis should be running on the default port 6379.

```bash
npm install
```

## Configuration
You can configure the app by copying variables from the .env.sample file to .env file.

## Running the app

```bash
    nodemon app.js
```

Your app should now be running on localhost:3000.

## Docker
You can also run the app using Docker. Make sure you have Docker installed on your machine.

```bash
    docker-compose up
```

## Success Request Sample
```bash
curl -X POST -H "Content-Type: application/json" -d '{
    "fromCurrency": "USD",
    "toCurrency": "EUR",
    "amount": 100
}' http://localhost:3000/convert
```

## Success Response Sample
```bash
{
    "fromCurrency": "USD",
    "toCurrency": "EUR",
    "amount": 100,
    "convertedAmount": 88.0
}
```

## Error Request Sample
```bash
curl -X POST -H "Content-Type: application/json" -d '{
    "fromCurrency": "USD",
    "toCurrency": "ABC",
    "amount": 100
}' http://localhost:3000/convert
```

## Error Response Sample
```bash
{
  "errors": [
    {
      "type": "field",
      "value": "ABC",
      "msg": "toCurrency must be a valid currency code",
      "path": "toCurrency",
      "location": "body"
    }
  ]
}
```


