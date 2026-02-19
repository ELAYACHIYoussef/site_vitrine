import api from './index';

export const createOrder = async (orderData) => {
    const response = await api.post('/orders', orderData);
    return response.data;
};

export const getAllOrders = async () => {
    try {
        const response = await api.get('/orders');
        if (Array.isArray(response.data)) {
            return response.data;
        }
        console.error("getAllOrders: API did not return an array", response.data);
        return [];
    } catch (error) {
        console.error("getAllOrders: Request failed", error);
        return [];
    }
};

export const getOrdersByUser = async (userId) => {
    try {
        const response = await api.get(`/orders/user/${userId}`);
        if (Array.isArray(response.data)) {
            return response.data;
        }
        console.error("getOrdersByUser: API did not return an array", response.data);
        return [];
    } catch (error) {
        console.error("getOrdersByUser: Request failed", error);
        return [];
    }
};

export const getOrderById = async (id) => {
    const response = await api.get(`/orders/${id}`);
    return response.data;
};

export const updateOrderStatus = async (id, status) => {
    const response = await api.put(`/orders/${id}/status`, { status });
    return response.data;
};
