import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api', // Gateway URL
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to include the JWT token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const authService = {
    login: (email, password) => api.post('/auth/login', { email, password }),
    register: (userData) => api.post('/auth/register', userData),
};

export const catalogService = {
    getProducts: () => api.get('/catalog/products'),
    getProduct: (id) => api.get(`/catalog/products/${id}`),
    incrementView: (id) => api.post(`/catalog/products/${id}/view`),
};

export default api;
