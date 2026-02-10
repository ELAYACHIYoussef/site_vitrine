import React from 'react';
import { Heart, ShoppingBag, Eye } from 'lucide-react';
import { motion } from 'framer-motion';

const ProductCard = ({ product }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="premium-card group"
        >
            <div className="relative aspect-square overflow-hidden bg-gray-100">
                <img
                    src={product.thumbnail || '/placeholder.jpg'}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-3">
                    <button className="p-3 bg-white rounded-full shadow-lg hover:bg-primary hover:text-white transition-all transform hover:scale-110">
                        <Heart className="w-5 h-5" />
                    </button>
                    <button className="p-3 bg-white rounded-full shadow-lg hover:bg-primary hover:text-white transition-all transform hover:scale-110">
                        <ShoppingBag className="w-5 h-5" />
                    </button>
                </div>
            </div>

            <div className="p-4">
                <span className="text-[10px] font-bold uppercase tracking-widest text-primary mb-1 block">
                    {product.categoryLabel}
                </span>
                <h3 className="text-lg font-bold text-secondary mb-1 line-clamp-1">{product.name}</h3>
                <p className="text-sm text-gray-500 line-clamp-2 mb-4 h-10">{product.descriptionCourte}</p>

                <div className="flex justify-between items-center">
                    <span className="text-xl font-extrabold text-secondary">{product.price} €</span>
                    <button className="flex items-center space-x-1 text-xs font-bold text-primary group-hover:underline">
                        <span>Détails</span>
                        <Eye className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default ProductCard;
