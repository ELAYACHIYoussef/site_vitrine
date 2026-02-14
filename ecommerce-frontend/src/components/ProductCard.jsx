import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { Heart, ShoppingBag, Eye } from 'lucide-react';
import { motion } from 'framer-motion';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();
    const { toggleWishlist, isInWishlist } = useWishlist();
    const isLoved = isInWishlist(product.id);

    // Fix image path logic
    const getImageUrl = (url) => {
        if (!url) return '/products/product_1.jpg'; // Default fallback
        if (url.startsWith('http')) return url;

        // Use backend URL like in Admin panel
        return `http://localhost:8082${url}`;
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className="group bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm card-hover"
        >
            <div className="relative aspect-[4/5] overflow-hidden bg-slate-100">
                <img
                    src={getImageUrl(product.thumbnail)}
                    onError={(e) => { e.target.onerror = null; e.target.src = '/products/product_1.jpg'; }}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Overlay Buttons */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 backdrop-blur-[2px]">
                    <button
                        onClick={() => toggleWishlist(product)}
                        className={`p-3 rounded-full shadow-lg transition-all transform hover:scale-110 hover:-translate-y-1 ${isLoved ? 'bg-rose-500 text-white' : 'bg-white text-slate-900 hover:bg-rose-500 hover:text-white'
                            }`}
                        title={isLoved ? "Retirer des favoris" : "Ajouter aux favoris"}
                    >
                        <Heart className={`w-5 h-5 ${isLoved ? 'fill-current' : ''}`} />
                    </button>
                    <button
                        onClick={() => addToCart(product)}
                        className="p-3 bg-white text-slate-900 rounded-full shadow-lg hover:bg-indigo-600 hover:text-white transition-all transform hover:scale-110 hover:-translate-y-1"
                        title="Ajouter au panier"
                    >
                        <ShoppingBag className="w-5 h-5" />
                    </button>
                    <Link to={`/products/${product.id}`} className="p-3 bg-white text-slate-900 rounded-full shadow-lg hover:bg-indigo-600 hover:text-white transition-all transform hover:scale-110 hover:-translate-y-1" title="Voir détails">
                        <Eye className="w-5 h-5" />
                    </Link>
                </div>

                {/* Badges/Tags if needed */}
                {product.new && (
                    <span className="absolute top-3 left-3 bg-indigo-600 text-white text-[10px] font-bold px-2 py-1 rounded-md shadow-lg">
                        NOUVEAU
                    </span>
                )}
            </div>

            <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-500 bg-indigo-50 px-2 py-1 rounded-full">
                        {product.categoryLabel || 'Collection'}
                    </span>
                    <div className="flex text-amber-400 text-xs">
                        {'★'.repeat(5)}
                    </div>
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-1 leading-tight group-hover:text-indigo-600 transition-colors">
                    {product.name}
                </h3>

                <p className="text-sm text-slate-500 line-clamp-2 mb-4 h-10 leading-relaxed">
                    {product.descriptionCourte || "Un design d'exception pour un confort inégalé."}
                </p>

                <div className="flex justify-between items-end border-t border-slate-100 pt-4 mt-2">
                    <div className="flex flex-col">
                        <span className="text-xs text-slate-400 font-medium">Prix</span>
                        <span className="text-xl font-extrabold text-slate-900">{product.price} €</span>
                    </div>
                    <Link to={`/products/${product.id}`} className="text-sm font-bold text-indigo-600 hover:text-indigo-800 transition-colors flex items-center gap-1 group/btn">
                        Voir le produit
                        <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
                    </Link>
                </div>
            </div>
        </motion.div>
    );
};

export default ProductCard;
