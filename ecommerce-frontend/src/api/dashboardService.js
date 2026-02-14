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
    const [catalog, auth] = await Promise.all([
        getCatalogStats(),
        getAuthStats()
    ]);
    return { catalog, auth };
};
