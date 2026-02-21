import api from './index';

export const createOrder = async (orderData) => {
    const response = await api.post('/orders', orderData);
    return response.data;
};

export const getAllOrders = async () => {
    const response = await api.get('/orders');
    return response.data;
};

export const getOrdersByUser = async (userId) => {
    const response = await api.get(`/orders/user/${userId}`);
    return response.data;
};

export const getOrderById = async (id) => {
    const response = await api.get(`/orders/${id}`);
    return response.data;
};

export const updateOrderStatus = async (id, status) => {
    const response = await api.put(`/orders/${id}/status`, { status });
    return response.data;
};
