async function placeOrder() {
    const url = 'http://localhost:3001/orders/';
    const orderData = {
        user_id: 1,
        symbol: "HACK",
        side: "buy",
        quantity: 1,
        order_type: "market",
        limit_price: 0
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderData)
        });

        const result = await response.json();
        console.log(result);
    } catch (error) {
        console.error('Order placement failed:', error);
    }
}
