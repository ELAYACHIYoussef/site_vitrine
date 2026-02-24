import api from './index';

export const customerService = {
    getAllCustomers: async () => {
        const response = await api.get('/auth/users');
        return response.data;
    },

    getCustomerOrders: async (userId) => {
        try {
            const response = await api.get(`/orders/user/${userId}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching orders for user ${userId}:`, error);
            return [];
        }
    },

    getAllOrders: async () => {
        try {
            const response = await api.get('/orders');
            return response.data;
        } catch (error) {
            console.error(`Error fetching all orders:`, error);
            return [];
        }
    }
};
