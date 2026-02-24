import api from './index';

const productService = {
    /**
     * Get all products
     */
    getAllProducts: async () => {
        const response = await api.get('/catalog/products');
        return response.data;
    },

    /**
     * Get product by ID
     */
    getProductById: async (id) => {
        const response = await api.get(`/catalog/products/${id}`);
        return response.data;
    },

    /**
     * Create product with images
     * @param {Object} productData - Product data
     * @param {File[]} images - Array of image files (max 6)
     */
    createProduct: async (productData, images) => {
        const formData = new FormData();

        // Add product fields
        formData.append('name', productData.name);
        formData.append('category', productData.category);
        if (productData.categoryLabel) formData.append('categoryLabel', productData.categoryLabel);
        formData.append('price', productData.price);
        formData.append('stock', productData.stock || 0);
        if (productData.description) formData.append('description', productData.description);
        if (productData.descriptionCourte) formData.append('descriptionCourte', productData.descriptionCourte);
        if (productData.videoUrl) formData.append('videoUrl', productData.videoUrl);
        if (productData.publishToInstagram !== undefined) formData.append('publishToInstagram', productData.publishToInstagram);

        // Add images
        if (images && images.length > 0) {
            images.forEach(image => {
                formData.append('images', image);
            });
        }

        const response = await api.post('/catalog/products', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        return response.data;
    },

    /**
     * Update product with images
     * @param {number} id - Product ID
     * @param {Object} productData - Product data to update
     * @param {File[]} images - Array of new image files
     */
    updateProduct: async (id, productData, images) => {
        const formData = new FormData();

        // Add product fields (only if provided)
        if (productData.name) formData.append('name', productData.name);
        if (productData.category) formData.append('category', productData.category);
        if (productData.categoryLabel) formData.append('categoryLabel', productData.categoryLabel);
        if (productData.price !== undefined) formData.append('price', productData.price);
        if (productData.stock !== undefined) formData.append('stock', productData.stock);
        if (productData.description) formData.append('description', productData.description);
        if (productData.descriptionCourte) formData.append('descriptionCourte', productData.descriptionCourte);
        if (productData.videoUrl) formData.append('videoUrl', productData.videoUrl);

        // Add images
        if (images && images.length > 0) {
            images.forEach(image => {
                formData.append('images', image);
            });
        }

        const response = await api.put(`/catalog/products/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        return response.data;
    },

    /**
     * Delete product
     */
    deleteProduct: async (id) => {
        const response = await api.delete(`/catalog/products/${id}`);
        return response.data;
    }
};

export default productService;
