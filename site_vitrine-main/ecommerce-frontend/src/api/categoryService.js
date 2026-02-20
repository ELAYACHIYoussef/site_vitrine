import api from './index';

export const getCategories = async () => {
    const response = await api.get('/catalog/categories');
    return response.data;
};

export const createCategory = async (categoryData) => {
    const response = await api.post('/catalog/categories', categoryData);
    return response.data;
};

export const updateCategory = async (id, categoryData) => {
    const response = await api.put(`/catalog/categories/${id}`, categoryData);
    return response.data;
};

export const deleteCategory = async (id) => {
    const response = await api.delete(`/catalog/categories/${id}`);
    return response.data;
};
