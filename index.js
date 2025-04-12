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

// --- LOOP FUNCTION ---
async function buy3() {
  const lastOrder = 3;

  for (let i = lastOrder; i > 0; i--) {
    console.log(`Processing order #${i}...`);
    try {
      await sendOrder();
    } catch (err) {
      console.error('Error during order sending:', err);
    }
  }
}

// Run it

