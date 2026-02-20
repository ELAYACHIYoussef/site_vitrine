import api from './index';

export const getCatalogStats = async () => {
    const response = await api.get('/catalog/stats');
    return response.data;
};

export const getAuthStats = async () => {
    const response = await api.get('/auth/stats');
    return response.data;
};

export const getDashboardStats = async () => {
    try {
        const [catalog, auth, orders] = await Promise.all([
            getCatalogStats(),
            getAuthStats(),
            api.get('/orders').then(res => res.data)
        ]);

        return {
            catalog,
            auth,
            orders: {
                totalOrders: orders.length,
                totalRevenue: orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0),
                recentOrders: orders.slice(-5).reverse()
            }
        };
    } catch (error) {
        console.error("Error aggregating dashboard stats", error);
        throw error;
    }
};
