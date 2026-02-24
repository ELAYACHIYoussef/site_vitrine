import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

async function testOrders() {
    console.log("Testing /orders endpoint...");
    try {
        const response = await api.get('/orders');
        console.log("Status:", response.status);
        console.log("Headers:", response.headers);
        console.log("Data Type:", typeof response.data);
        console.log("Is Array:", Array.isArray(response.data));
        console.log("Data Preview:", JSON.stringify(response.data).slice(0, 200));
    } catch (error) {
        console.error("Error fetching orders:", error.message);
        if (error.response) {
            console.error("Error Status:", error.response.status);
            console.error("Error Data:", error.response.data);
        }
    }
}

async function testAuthStats() {
    console.log("\nTesting /auth/stats endpoint...");
    try {
        const response = await api.get('/auth/stats');
        console.log("Status:", response.status);
        console.log("Data:", response.data);
    } catch (error) {
        console.error("Error fetching auth stats:", error.message);
        if (error.response) {
            console.error("Error Status:", error.response.status);
            console.error("Error Data:", error.response.data);
        }
    }
}

async function createOrder() {
    console.log("\nTesting POST /orders (Create Order)...");
    const orderPayload = {
        userId: 5, // Explicitly testing for User ID 5
        items: [
            {
                productId: "1", // Assuming a product with ID 1 exists in Catalog
                quantity: 1
            }
        ],
        shippingAddress: "123 Test St, Paris, France",
        billingAddress: "123 Test St, Paris, France"
    };

    try {
        const response = await api.post('/orders', orderPayload);
        console.log("Create Order Status:", response.status);
        console.log("Created Order ID:", response.data.id || response.data.orderNumber);
        return response.data;
    } catch (error) {
        console.error("Error creating order:", error.message);
        if (error.response) {
            console.error("Error Status:", error.response.status);
            console.error("Error Data:", JSON.stringify(error.response.data));
        }
    }
}

async function testCustomers() {
    console.log("\nTesting /users (Customers) endpoint...");
    try {
        // Assuming customers are Users with ROLE_USER, served by Auth service? 
        // Or checking dashboardService for the correct endpoint. 
        // Based on screenshots "Clients" page likely calls /users or /customers
        const response = await api.get('/users');
        console.log("Status:", response.status);
        console.log("Data Type:", typeof response.data);
        console.log("Is Array:", Array.isArray(response.data));
    } catch (error) {
        // Try fallback if /users fails
        try {
            const response = await api.get('/auth/users');
            console.log("Status (/auth/users):", response.status);
        } catch (err) {
            console.error("Error fetching customers:", error.message);
        }
    }
}

async function testCatalogStats() {
    console.log("\nTesting /catalog/stats endpoint...");
    try {
        const response = await api.get('/catalog/stats');
        console.log("Status:", response.status);
        console.log("Data:", response.data);
    } catch (error) {
        console.error("Error fetching catalog stats:", error.message);
    }
}

async function run() {
    // await testAuthStats();
    // await testCatalogStats();
    await createOrder();
    await testOrders(); // Verify the created order appears in the list
    // await testCustomers();
}

run();
