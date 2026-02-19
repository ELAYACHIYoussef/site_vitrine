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
            getCatalogStats().catch(err => {
                console.error("Failed to fetch catalog stats:", err);
                return null;
            }),
            getAuthStats().catch(err => {
                console.error("Failed to fetch auth stats:", err);
                return null;
            }),
            api.get('/orders').then(res => {
                if (Array.isArray(res.data)) {
                    return res.data;
                }
                console.error("Orders response is not an array:", res.data);
                return [];
            }).catch(err => {
                console.error("Failed to fetch orders:", err);
                return [];
            })
        ]);

        return {
            catalog: catalog || {},
            auth: auth || {},
            orders: {
                totalOrders: Array.isArray(orders) ? orders.length : 0,
                totalRevenue: (Array.isArray(orders) ? orders : []).reduce((sum, order) => sum + (order.totalAmount || 0), 0),
                recentOrders: (Array.isArray(orders) ? orders : []).slice(-5).reverse()
            }
        };
    } catch (error) {
        console.error("Error aggregating dashboard stats", error);
        throw error;
    }
};
