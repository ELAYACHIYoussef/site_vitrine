import React, { useEffect, useState } from 'react';
import { catalogService } from '../api';
import ProductCard from './ProductCard';
import { Loader2 } from 'lucide-react';

const SkeletonCard = () => (
    <div className="premium-card p-8 group h-full">
        <div className="aspect-[4/5] skeleton mb-6 rounded-2xl"></div>
        <div className="flex justify-between items-center mb-4">
            <div className="h-3 w-20 skeleton"></div>
            <div className="h-3 w-10 skeleton"></div>
        </div>
        <div className="h-6 w-3/4 skeleton mb-4"></div>
        <div className="h-4 w-full skeleton mb-2"></div>
        <div className="h-4 w-2/3 skeleton mb-8"></div>
        <div className="flex justify-between items-center mt-auto pt-6 border-t border-slate-100">
            <div className="space-y-2">
                <div className="h-2 w-12 skeleton"></div>
                <div className="h-6 w-20 skeleton"></div>
            </div>
            <div className="w-12 h-12 rounded-full skeleton"></div>
        </div>
    </div>
);

const ProductGrid = ({ limit }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await catalogService.getProducts();
                let data = response.data;
                if (limit) data = data.slice(0, limit);
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                // Simulate slightly longer loading for demo of skeleton if needed, 
                // but here we just use regular timing
                setLoading(false);
            }
        };
        fetchProducts();
    }, [limit]);

    if (loading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
                {[1, 2, 3, 4].map((n) => (
                    <SkeletonCard key={n} />
                ))}
            </div>
        );
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12"
        >
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </motion.div>
    );
};

export default ProductGrid;
