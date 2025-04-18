const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const fetch = require('node-fetch').default;

const app = express();

app.use('/orders', createProxyMiddleware({
  target: 'http://82.29.197.23:8000',
  changeOrigin: true
}));

app.listen(3001, () => {
  console.log('Proxy server is running on http://localhost:3001');
});

// --- AUTH SETUP ---
const username = String(1);
const password = 'honda2015';
const credentials = btoa(`${username}:${password}`);

// --- ORDER FUNCTION ---
async function sendOrder() {
  const url = 'http://82.29.197.23:8000/orders/';

  const order = {
    "user_id": 1,
    "symbol": "HACK",
    "side": "buy",
    "quantity": 1,
    "order_type": "market",
    "limit_price": 0
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${credentials}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(order)
    });

    const result = await response.json();
    console.log('Order response:', result);
  } catch (error) {
    console.error('Error sending order:', error);
  }
}

// --- SELL FUNCTION ---
async function sellOrder() {
    const url = 'http://82.29.197.23:8000/orders/';
  
    const order = {
      "user_id": 1,
      "symbol": "HACK",
      "side": "sell",
      "quantity": 1,
      "order_type": "market",
      "limit_price": 0
    };
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${credentials}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(order)
      });
  
      const result = await response.json();
      console.log('Order response:', result);
    } catch (error) {
      console.error('Error sending order:', error);
    }
  }

//------- BUY OR SELL-------
async function current() {
    const url = 'http://82.29.197.23:8000/stocks/';
    const priceThreshold = 85; // Set your trigger price here
  
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Basic ${credentials}`,
          'Content-Type': 'application/json'
        },
      });
  
      const result = await response.json();
  
      if (Array.isArray(result) && result.length > 0) {
        const price = result[0].price;
        console.log('Current Price:', price);
  
        if (price < priceThreshold) {
          console.log(`Price is below ${priceThreshold}. Sending order...`);
          await sendOrder();
        } else {
          console.log(`Price is above ${priceThreshold}. Selling...`);
          await sellOrder();
        }
      } else {
        console.warn('Unexpected response format:', result);
      }
  
    } catch (error) {
      console.error('Error in current():', error);
    }
  }

// --- START LOOP ---
function trading() {
    console.log('Trading started...');
    setInterval(async () => {
      try {
        await current();
      } catch (err) {
        console.error('Error calling current:', err);
      }
    }, 1000);
  }
  
  trading();
