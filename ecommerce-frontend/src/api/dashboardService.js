import axios from 'axios';

const API = 'http://localhost:8080/api';

export const getCatalogStats = async () => {
    const response = await axios.get(`${API}/catalog/stats`);
    return response.data;
};

export const getAuthStats = async () => {
    const response = await axios.get(`${API}/auth/stats`);
    return response.data;
};

export const getDashboardStats = async () => {
    const [catalog, auth] = await Promise.all([
        getCatalogStats(),
        getAuthStats()
    ]);
    return { catalog, auth };
};
