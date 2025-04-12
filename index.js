const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.use('/orders', createProxyMiddleware({
  target: 'http://82.29.197.23:8000',
  changeOrigin: true
}));

app.listen(3001, () => {
    console.log('Proxy server is running on http://localhost:3001');
  });


    // authUser.js
const fetch = require('node-fetch').default;

async function authUser() {
    const url = 'http://82.29.197.23:8000/accounts/authenticate';

    const order = {
        "additionalProp1": "string",
        "additionalProp2": "string",
        "additionalProp3": "string"
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(order)
        });

        const result = await response.json();
        console.log('Response:', result);
    } catch (error) {
        console.error('Error sending order:', error);
    }
}

  // placeOrder.js
const fetch = require('node-fetch').default;

async function sendOrder() {
    const url = 'http://82.29.197.23:8000/orders/';

    const order = {
        "user_id": 1,
        "symbol": "HACK",
        "side": "sell",
        "quantity": 50,
        "order_type": "market",
        "limit_price": 0
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
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

authUser();
sendOrder();



// // Function to decide when to call authUser() and sendOrder() based on history
// function processHistoryBasedOrder() {
//     const lastOrder = history();
  
//     // Let's assume you want to call authUser and sendOrder only if history() returns a valid order
//     if (lastOrder && lastOrder.symbol) {
//       console.log('History found, processing order...');
      
//       // Call authUser before sending the order (if needed)
//       authUser()
//         .then(() => {
//           sendOrder(lastOrder);
//         })
//         .catch(err => {
//           console.error('Error during authentication:', err);
//         });
//     } else {
//       console.log('No valid order in history.');
//     }
//   }
  
//   // Call processHistoryBasedOrder() based on your conditions (for example, on a timer)
//   setInterval(processHistoryBasedOrder, 60000); // Example: check and process order every 60 seconds (60000 ms)
