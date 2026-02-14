if (!url) return '/products/product_1.jpg'; // Default fallback
if (url.startsWith('http')) return url;

// Check if it's a frontend public asset
if (url.startsWith('/products/') || url.startsWith('products/')) {
    return url.startsWith('/') ? url : `/${url}`;
}

// Use backend URL for uploads
// Ensure we don't double slash if url starts with /
const baseUrl = 'http://localhost:8082';
const path = url.startsWith('/') ? url : `/${url}`;
return `${baseUrl}${path}`;
};
