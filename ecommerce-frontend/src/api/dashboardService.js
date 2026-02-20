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
    // Use allSettled so a single failure doesn't crash the entire dashboard
    const [catalogResult, authResult, ordersResult] = await Promise.allSettled([
        getCatalogStats(),
        getAuthStats(),
        api.get('/orders').then(res => res.data)
    ]);

    const catalog = catalogResult.status === 'fulfilled' ? catalogResult.value : {
        totalProducts: 0, totalStock: 0, catalogValue: 0, totalViews: 0, productsByCategory: {}
    };

    const auth = authResult.status === 'fulfilled' ? authResult.value : {
        totalUsers: 0, admins: 0, clients: 0, recentUsers: []
    };

    const ordersData = ordersResult.status === 'fulfilled' ? ordersResult.value : [];

    if (catalogResult.status === 'rejected') console.warn('catalog/stats failed:', catalogResult.reason?.message);
    if (authResult.status === 'rejected') console.warn('auth/stats failed:', authResult.reason?.message);
    if (ordersResult.status === 'rejected') console.warn('orders failed:', ordersResult.reason?.message);

    return {
        catalog,
        auth,
        orders: {
            totalOrders: Array.isArray(ordersData) ? ordersData.length : 0,
            totalRevenue: Array.isArray(ordersData)
                ? ordersData.reduce((sum, order) => sum + (order.totalAmount || 0), 0)
                : 0,
            recentOrders: Array.isArray(ordersData) ? ordersData.slice(-5).reverse() : []
        }
    };
};

